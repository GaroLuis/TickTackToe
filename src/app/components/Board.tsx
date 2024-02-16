'use client'

import { GroupProps, MeshProps } from '@react-three/fiber';

export default function Board(props: GroupProps) {
  return (
    <group {...props}>
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
    </group>
  )
}
