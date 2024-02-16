'use client'

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import XChip from '@/app/components/XChip';
import OChip from '@/app/components/OChip';
import Board from '@/app/components/Board';

export default function Home() {
  return (
    <main className="w-[100vw] h-[100vh]">
      <Canvas className={'bg-white'}>
        <Board />
        <XChip position={[-2.5, 2.5, 0]} />
        <XChip position={[0, 2.5, 0]}/>
        <XChip position={[2.5, 2.5, 0]}/>
        <OChip position={[-2.5, 0, 0]} />
        <OChip position={[0, 0, 0]}/>
        <OChip position={[2.5, 0, 0]}/>
        <XChip position={[-2.5, -2.5, 0]} />
        <XChip position={[0, -2.5, 0]}/>
        <XChip position={[2.5, -2.5, 0]}/>
        <OrbitControls />
      </Canvas>
    </main>
  );
}
