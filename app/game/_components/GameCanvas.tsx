'use client';

import { useEffect, useRef, useState } from 'react';
import kaboom from 'kaboom';

export default function GameCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [modalContent, setModalContent] = useState<{
    title: string;
    body: string;
  } | null>(null);

  useEffect(() => {
    // Initialize Kaboom
    const k = kaboom({
      global: false,
      canvas: canvasRef.current!,
      background: [30, 30, 40], // Dark slate background
      width: window.innerWidth,
      height: window.innerHeight,
      scale: 1,
      debug: true,
    });

    // Load Assets
    k.loadSprite('bean', 'https://kaboomjs.com/sprites/bean.png');
    k.loadSprite('steel', 'https://kaboomjs.com/sprites/steel.png');
    k.loadSprite('grass', 'https://kaboomjs.com/sprites/grass.png');
    k.loadSprite('brick', 'https://kaboomjs.com/sprites/brick.png');
    k.loadSprite('key', 'https://kaboomjs.com/sprites/key.png');
    k.loadSprite('door', 'https://kaboomjs.com/sprites/door.png');
    k.loadSprite('ghosty', 'https://kaboomjs.com/sprites/ghosty.png');

    // Define Scene
    k.scene('main', () => {
      // Map Layout
      // W: Wall (Steel), B: Brick, D: Door, C: Chest (Key), P: Player Start
      // Areas: Top-Left: About, Top-Right: Skills, Bottom-Left: Projects, Bottom-Right: Contact
      const mapLayout = [
        'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW',
        'W                                      W',
        'W  BBBBBB            BBBBBB            W',
        'W  B    B            B    B            W',
        'W  B    D            B    D            W',
        'W  BBBBBB            BBBBBB            W',
        'W                                      W',
        'W                  P                   W',
        'W                                      W',
        'W  BBBBBB            BBBBBB            W',
        'W  B    B            B    B            W',
        'W  B    D            B    D            W',
        'W  BBBBBB            BBBBBB            W',
        'W                                      W',
        'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW',
      ];

      const levelConfig = {
        tileWidth: 64,
        tileHeight: 64,
        tiles: {
          W: () => [
            k.sprite('steel'),
            k.area(),
            k.body({ isStatic: true }),
            'wall',
          ],
          B: () => [
            k.sprite('brick'),
            k.area(),
            k.body({ isStatic: true }),
            'wall',
          ],
          D: () => [
            k.sprite('door'),
            k.area(),
            k.body({ isStatic: true }),
            'door',
          ],
        },
      };

      const map = k.addLevel(mapLayout, levelConfig);

      // Calculate map dimensions manually
      const mapWidth = mapLayout[0].length * levelConfig.tileWidth;
      const mapHeight = mapLayout.length * levelConfig.tileHeight;

      // Add Background (Grass) - Tiled
      // We can't easily tile a sprite in the background without a loop,
      // so we'll just set the background color for now or add a big rectangle.
      // Kaboom's 'background' option handles the clear color.

      // Add Player
      const player = k.add([
        k.sprite('bean'),
        k.pos(k.center()), // Will be overridden if P is found, but we didn't define P in tiles
        k.area(),
        k.body(),
        k.anchor('center'),
        'player',
      ]);

      // Place player at center of map roughly
      player.pos = k.vec2(mapWidth / 2, mapHeight / 2);

      // Camera follows player
      player.onUpdate(() => {
        k.camPos(player.pos);
      });

      // Player Movement
      const SPEED = 320;
      k.onKeyDown('left', () => player.move(-SPEED, 0));
      k.onKeyDown('right', () => player.move(SPEED, 0));
      k.onKeyDown('up', () => player.move(0, -SPEED));
      k.onKeyDown('down', () => player.move(0, SPEED));

      // Interaction Logic
      let currentInteraction: string | null = null;
      const label = k.add([
        k.text(''),
        k.pos(0, -50),
        k.anchor('center'),
        k.color(255, 255, 255),
      ]);

      // Attach label to player
      player.onUpdate(() => {
        label.pos = player.pos.add(0, -50);
      });

      // Define interaction zones manually for now (simpler than tile properties for this demo)
      // Top-Left: About
      k.add([
        k.rect(64, 64),
        k.pos(350, 280), // Approximate coordinates based on grid
        k.area(),
        k.opacity(0),
        'interactable',
        { title: 'About Me', body: 'I am a Data Scientist & Developer...' },
      ]);

      // Check for collisions with doors
      player.onCollide('door', (d) => {
        label.text = 'Press SPACE';
        currentInteraction = 'door';
      });

      player.onCollideEnd('door', () => {
        label.text = '';
        currentInteraction = null;
      });

      k.onKeyPress('space', () => {
        if (currentInteraction) {
          // Trigger React Modal
          // We need to identify WHICH door.
          // For this MVP, let's just show a generic message or calculate based on position.
          const p = player.pos;
          let title = 'Unknown';
          let body = 'Nothing here.';

          if (p.y < mapHeight / 2) {
            if (p.x < mapWidth / 2) {
              title = 'About Me';
              body = 'I am Ezechiel, a passionate Data Scientist.';
            } else {
              title = 'Skills';
              body = 'Python, React, Next.js, TensorFlow, PyTorch.';
            }
          } else {
            if (p.x < mapWidth / 2) {
              title = 'Projects';
              body = 'Check out my GitHub for latest AI projects.';
            } else {
              title = 'Contact';
              body = 'Email: contact@bigz.dev';
            }
          }

          setModalContent({ title, body });
        }
      });

      // UI Text
      k.add([k.text('RPG Mode'), k.pos(24, 24), k.fixed()]);
    });

    k.go('main');
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-slate-900 overflow-hidden">
      <canvas ref={canvasRef} className="block" />

      {/* Modal Overlay */}
      {modalContent && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl bg-slate-800 p-8 shadow-2xl border border-slate-700 animate-fade-in-up">
            <h2 className="mb-4 text-3xl font-bold text-blue-400">
              {modalContent.title}
            </h2>
            <p className="mb-8 text-lg text-slate-300">{modalContent.body}</p>
            <button
              onClick={() => setModalContent(null)}
              className="rounded-lg bg-blue-600 px-6 py-2 font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
