'use client'

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Board from '@/app/components/Board';
import { useState } from 'react';
import { OChipTag } from '@/app/components/OChip';
import { XChipTag } from '@/app/components/XChip';

export default function Home() {
  const [state, setState] = useState<{
    board: (OChipTag | XChipTag | null)[],
    turn: OChipTag | XChipTag,
  }>({
    board: [
      null, null, null,
      null, null, null,
      null, null, null,
    ],
    turn: 'X',
  })

  return (
    <main className="w-[100vw] h-[100vh]">
      <Canvas className={'bg-white'}>
        <Board
          chips={state.board}
          playChip={(index) => {
            const board = [...state.board]
            board[index] = state.turn

            setState(prevState => ({
              board: board,
              turn: prevState.turn === 'X' ? 'O' : 'X',
            }))
          }}
        />
        <OrbitControls/>
      </Canvas>
    </main>
  );
}
