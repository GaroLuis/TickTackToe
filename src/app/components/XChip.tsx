'use client'

import { GroupProps } from '@react-three/fiber';

export default function XChip(props: GroupProps) {
  return (
    <group {...props} rotation={[0, 0, Math.PI / 4]}>
      <mesh>
        <boxGeometry args={[2, 0.5, 0.5]}/>
        <meshBasicMaterial color={'blue'}/>
      </mesh>
      <mesh>
        <boxGeometry args={[0.5, 2, 0.5]}/>
        <meshBasicMaterial color={'blue'}/>
      </mesh>
    </group>
  )
}
