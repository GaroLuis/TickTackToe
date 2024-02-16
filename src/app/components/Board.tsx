import React from 'react';
import OChip, { OChipTag } from '@/app/components/OChip';
import XChip, { XChipTag } from '@/app/components/XChip';
import { Vector3 } from 'three';

function getPosition(index: number) {
  return new Vector3((index % 3 - 1) * 2.5, index < 3 ? 2.5 : index > 5 ? -2.5 : 0, 0)
}

export default function Board({chips, playChip}: {
  chips: (OChipTag | XChipTag | null)[],
  playChip: (index: number) => void
}) {
  return (
    <group>
      <mesh position={[-1.25, 0, 0]}>
        <boxGeometry args={[0.25, 8, 0.5]}/>
        <meshBasicMaterial color={'silver'}/>
      </mesh>
      <mesh position={[1.25, 0, 0]}>
        <boxGeometry args={[0.25, 8, 0.5]}/>
        <meshBasicMaterial color={'silver'}/>
      </mesh>
      <mesh position={[0, 1.25, 0]}>
        <boxGeometry args={[8, 0.25, 0.5]}/>
        <meshBasicMaterial color={'silver'}/>
      </mesh>
      <mesh position={[0, -1.25, 0]}>
        <boxGeometry args={[8, 0.25, 0.5]}/>
        <meshBasicMaterial color={'silver'}/>
      </mesh>
      {chips.map((chip, index) => {
        if (chip === 'O') {
          return (<OChip position={getPosition(index)} key={Math.random()}/>)
        }

        if (chip === 'X') {
          return (<XChip position={getPosition(index)} key={Math.random()}/>)
        }

        return (
          <mesh position={getPosition(index)} visible={false} onClick={() => playChip(index)} key={Math.random()}>
            <boxGeometry args={[2, 2, 0.5]}/>
          </mesh>
        )
      })}
    </group>
  )
}
