import { GameState, EndState } from '@/app/components/Game';

export const checkEndState = (gameState: GameState): EndState | null => {
  const { board, turn } = gameState;
  const chip = turn === 'X' ? 'O' : 'X';

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
    return {
      won: chip,
      end: true,
    };
  }

  if (!gameState.board.some((chip) => chip === null)) {
    return {
      won: null,
      end: true,
    };
  }

  return null
};
