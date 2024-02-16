import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text3D } from '@react-three/drei';
import Board from '@/app/components/Board';
import { OChipTag } from '@/app/components/OChip';
import { XChipTag } from '@/app/components/XChip';
import roboto from '../../assets/roboto_font.json'

export default function Game({gameState, setGameState, endState, setEndState}: Props) {
  function checkWin(board: (OChipTag | XChipTag | null)[], chip: OChipTag | XChipTag) {
    if (
      (board[0] === chip && board[1] === chip && board[2] === chip) ||
      (board[3] === chip && board[4] === chip && board[5] === chip) ||
      (board[6] === chip && board[7] === chip && board[8] === chip) ||
      (board[0] === chip && board[3] === chip && board[6] === chip) ||
      (board[1] === chip && board[4] === chip && board[7] === chip) ||
      (board[2] === chip && board[5] === chip && board[8] === chip) ||
      (board[0] === chip && board[4] === chip && board[8] === chip) ||
      (board[2] === chip && board[4] === chip && board[6] === chip)
    ) {
      setEndState({
        won: gameState.turn,
        end: true,
      })
      return
    }

    if (!gameState.board.some((chip) => chip === null)) {
      setEndState({
        won: null,
        end: true,
      })
    }
  }

  return (
    <main className="w-[100vw] h-[100vh]">
      <Canvas
        camera={{
          position: [0, 0, 10]
        }}
      >
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

            checkWin(board, chip)
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
}
