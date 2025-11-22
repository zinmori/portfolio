'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import html2canvas from 'html2canvas';

interface MeltingTransitionProps {
  isActive: boolean;
  onComplete: () => void;
}

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform float uTime;
uniform sampler2D uTexture;
uniform float uResolution;
varying vec2 vUv;

// Simplex 2D noise
vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 uv = vUv;
  
  // Melt effect
  float noiseVal = snoise(vec2(uv.x * 10.0, uTime * 2.0));
  float drop = max(0.0, uTime - 0.1) * (1.0 + noiseVal * 0.5);
  
  // Distortion
  float distortion = snoise(vec2(uv.y * 20.0, uTime * 5.0)) * uTime * 0.1;
  
  vec2 distortedUv = vec2(
    uv.x + distortion,
    uv.y + drop * 1.5 // Move texture up (content moves down)
  );

  // Glitch / RGB Split
  float rgbShift = uTime * 0.05 * snoise(vec2(uTime * 10.0, uv.y));
  
  vec4 r = texture2D(uTexture, distortedUv + vec2(rgbShift, 0.0));
  vec4 g = texture2D(uTexture, distortedUv);
  vec4 b = texture2D(uTexture, distortedUv - vec2(rgbShift, 0.0));
  
  vec4 color = vec4(r.r, g.g, b.b, 1.0);
  
  // Fade to black
  float fade = smoothstep(0.7, 1.0, uTime);
  color = mix(color, vec4(0.0, 0.0, 0.0, 1.0), fade);
  
  // If UV is out of bounds, draw black
  if (distortedUv.y > 1.0 || distortedUv.y < 0.0 || distortedUv.x > 1.0 || distortedUv.x < 0.0) {
    color = vec4(0.0, 0.0, 0.0, 1.0);
  }

  gl_FragColor = color;
}
`;

export const MeltingTransition = ({
  isActive,
  onComplete,
}: MeltingTransitionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isCapturing, setIsCapturing] = useState(false);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const startTransition = async () => {
      setIsCapturing(true);

      try {
        // Capture the screen
        const canvas = await html2canvas(document.body, {
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#0c0c0c', // Match theme background
          logging: false,
          scale: 0.5, // Reduce resolution for performance
          ignoreElements: (element) => {
            return element.classList.contains('melting-ignore');
          },
        });

        setIsCapturing(false);

        // Setup Three.js
        const width = window.innerWidth;
        const height = window.innerHeight;

        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(
          width / -2,
          width / 2,
          height / 2,
          height / -2,
          1,
          1000,
        );
        camera.position.z = 1;

        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(window.devicePixelRatio);
        containerRef.current?.appendChild(renderer.domElement);

        // Create plane with captured texture
        const texture = new THREE.CanvasTexture(canvas);
        const geometry = new THREE.PlaneGeometry(width, height);

        const material = new THREE.ShaderMaterial({
          uniforms: {
            uTime: { value: 0 },
            uTexture: { value: texture },
            uResolution: { value: new THREE.Vector2(width, height) },
          },
          vertexShader,
          fragmentShader,
          transparent: true,
        });

        const plane = new THREE.Mesh(geometry, material);
        scene.add(plane);

        // Animation loop
        let startTime = performance.now();
        const duration = 1500; // 1.5 seconds

        const animate = (time: number) => {
          const elapsed = time - startTime;
          const progress = Math.min(elapsed / duration, 1.0);

          material.uniforms.uTime.value = progress;
          renderer.render(scene, camera);

          if (progress < 1.0) {
            requestAnimationFrame(animate);
          } else {
            // Cleanup and complete
            onComplete();
            // Keep the black screen for a moment or let the router handle the next page
            // We don't remove the canvas immediately to avoid flash
          }
        };

        requestAnimationFrame(animate);

        // Handle resize
        const handleResize = () => {
          const w = window.innerWidth;
          const h = window.innerHeight;
          renderer.setSize(w, h);
          camera.left = w / -2;
          camera.right = w / 2;
          camera.top = h / 2;
          camera.bottom = h / -2;
          camera.updateProjectionMatrix();
          material.uniforms.uResolution.value.set(w, h);
        };

        window.addEventListener('resize', handleResize);

        return () => {
          window.removeEventListener('resize', handleResize);
          renderer.dispose();
          geometry.dispose();
          material.dispose();
          texture.dispose();
          if (containerRef.current?.contains(renderer.domElement)) {
            containerRef.current.removeChild(renderer.domElement);
          }
        };
      } catch (error) {
        console.error('Transition error:', error);
        onComplete();
      }
    };

    startTransition();
  }, [isActive, onComplete]);

  if (!isActive) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] pointer-events-none melting-ignore"
      style={{ background: isCapturing ? 'transparent' : 'black' }}
    >
      {isCapturing && (
        <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px] animate-pulse" />
      )}
    </div>
  );
};
