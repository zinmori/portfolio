'use client';

import { useEffect, useRef } from 'react';

const characters =
  '01アカサタナハマヤラワガザダバパイキシチニヒミリギジヂビピウクスツヌフムユルグズヅブプエケセテネヘメレゲゼデベペオコソトノホモヨロゴゾドボポABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';

export function MatrixOverlay({
  active,
  onClose,
}: {
  active: boolean;
  onClose: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const timeoutRef = useRef<number>();

  useEffect(() => {
    if (!active) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext('2d');
    if (!context) {
      return;
    }

    const fontSize = 16;
    let drops: number[] = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const columns = Math.max(1, Math.floor(canvas.width / fontSize));
      drops = Array.from(
        { length: columns },
        () => Math.random() * canvas.height,
      );
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const draw = () => {
      context.fillStyle = 'rgba(0, 0, 0, 0.08)';
      context.fillRect(0, 0, canvas.width, canvas.height);

      context.fillStyle = '#0f0';
      context.font = `${fontSize}px 'Fira Code', monospace`;

      drops.forEach((drop, index) => {
        const char = characters.charAt(
          Math.floor(Math.random() * characters.length),
        );
        const x = index * fontSize;
        const y = drop * fontSize;
        context.fillText(char, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[index] = 0;
        }

        drops[index] += 0.6 + Math.random() * 0.4;
      });

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const handleClick = () => onClose();

    document.addEventListener('keydown', handleKeyDown);
    canvas.addEventListener('click', handleClick);
    timeoutRef.current = window.setTimeout(onClose, 15000);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
      document.removeEventListener('keydown', handleKeyDown);
      canvas.removeEventListener('click', handleClick);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [active, onClose]);

  if (!active) {
    return null;
  }

  return <canvas ref={canvasRef} className="matrix-overlay" />;
}
