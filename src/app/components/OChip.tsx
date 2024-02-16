'use client'

import { GroupProps, MeshProps } from '@react-three/fiber';

export default function OChip(props: MeshProps) {
  return (
      <mesh {...props}>
        <torusGeometry args={[0.75, 0.2, 15, 50]} />
        <meshBasicMaterial color={'red'}/>
      </mesh>
  )
}
