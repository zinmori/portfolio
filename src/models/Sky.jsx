import { useGLTF } from '@react-three/drei';
import React, { useRef } from 'react';

import skyScene from '../assets/3d/sky.glb';
import { useFrame } from '@react-three/fiber';

const Sky = () => {
  const sky = useGLTF(skyScene);
  const ref = useRef();

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.002;
    }
  });
  return (
    <mesh ref={ref} scale={[100, 100, 100]}>
      <primitive object={sky.scene} />
    </mesh>
  );
};

export default Sky;
