'use client'

import { MeshProps } from '@react-three/fiber';

export type OChipTag= 'O'

export default function OChip(props: MeshProps) {
  return (
      <mesh {...props}>
        <torusGeometry args={[0.75, 0.2, 15, 50]} />
        <meshBasicMaterial color={'red'}/>
      </mesh>
  )
}
