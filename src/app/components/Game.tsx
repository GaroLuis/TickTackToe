import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text3D } from '@react-three/drei';
import Board from '@/app/components/Board';
import { OChipTag } from '@/app/components/OChip';
import { XChipTag } from '@/app/components/XChip';
import roboto from '../../assets/roboto_font.json'

export default function Game({gameState, setGameState, endState, chip}: Props) {
  return (
    <main className="w-[100vw] h-[100vh]">
      <Canvas
        camera={{
          position: [0, 0, 10]
        }}
      >
        {gameState.turn === chip && !endState.end && (
          <Text3D font={roboto as unknown as string} position={[-3, 5, 0]}>
            Your turn!
            <meshBasicMaterial color={'white'}/>
          </Text3D>
        )}
        {endState.won && (
          <Text3D font={roboto as unknown as string} position={[0, 0, 2]}>
            {endState.won} WON!
            <meshBasicMaterial color={'yellow'}/>
          </Text3D>
        )}
        {endState.end && !endState.won && (
          <Text3D font={roboto as unknown as string} position={[0, 0, 2]}>
            DRAW!
            <meshBasicMaterial color={'orange'}/>
          </Text3D>
        )}
        <Board
          chips={gameState.board}
          playChip={(index) => {
            if (endState.end) {
              return;
            }

            const board = [...gameState.board]
            board[index] = gameState.turn
            const chip = gameState.turn;

            setGameState(({
              board: board,
              turn: chip === 'X' ? 'O' : 'X',
            }))
          }}
        />
        <OrbitControls/>
      </Canvas>
    </main>
  );
}

export type GameState = {
  board: (OChipTag | XChipTag | null)[],
  turn: OChipTag | XChipTag,
}

export type EndState = {
  won: OChipTag | XChipTag | null,
  end: boolean,
}

type Props = {
  gameState: GameState;
  endState: EndState;
  setGameState: (state: GameState) => void;
  setEndState: (state: EndState) => void;
  chip?: OChipTag | XChipTag,
}
