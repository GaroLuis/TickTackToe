import {checkEndState} from '../checkEndState';
import {GameState} from '@/app/components/Game';

function createGameState(board: GameState['board'], turn: GameState['turn']): GameState {
  return {board, turn};
}

describe('checkEndState', () => {
  describe('X wins', () => {
    it('X wins top row', () => {
      const state = createGameState(
        [
          'X', 'X', 'X',
          null, null, null,
          null, null, null
        ],
        'O'
      );
      expect(checkEndState(state)).toEqual({won: 'X', end: true});
    });

    it('X wins middle row', () => {
      const state = createGameState(
        [
          null, null, null,
          'X', 'X', 'X',
          null, null, null
        ],
        'O'
      );
      expect(checkEndState(state)).toEqual({won: 'X', end: true});
    });

    it('X wins bottom row', () => {
      const state = createGameState(
        [
          null, null, null,
          null, null, null,
          'X', 'X', 'X'
        ],
        'O'
      );
      expect(checkEndState(state)).toEqual({won: 'X', end: true});
    });

    it('X wins left column', () => {
      const state = createGameState(
        [
          'X', null, null,
          'X', null, null,
          'X', null, null
        ],
        'O'
      );
      expect(checkEndState(state)).toEqual({won: 'X', end: true});
    });

    it('X wins middle column', () => {
      const state = createGameState(
        [
          null, 'X', null,
          null, 'X', null,
          null, 'X', null
        ],
        'O'
      );
      expect(checkEndState(state)).toEqual({won: 'X', end: true});
    });

    it('X wins right column', () => {
      const state = createGameState(
        [
          null, null, 'X',
          null, null, 'X',
          null, null, 'X'
        ],
        'O'
      );
      expect(checkEndState(state)).toEqual({won: 'X', end: true});
    });

    it('X wins diagonal top-left to bottom-right', () => {
      const state = createGameState(
        [
          'X', null, null,
          null, 'X', null,
          null, null, 'X'
        ],
        'O'
      );
      expect(checkEndState(state)).toEqual({won: 'X', end: true});
    });

    it('X wins diagonal top-right to bottom-left', () => {
      const state = createGameState(
        [
          null, null, 'X',
          null, 'X', null,
          'X', null, null
        ],
        'O'
      );
      expect(checkEndState(state)).toEqual({won: 'X', end: true});
    });
  });

  describe('O wins', () => {
    it('O wins top row', () => {
      const state = createGameState(
        [
          'O', 'O', 'O',
          null, null, null,
          null, null, null
        ],
        'X'
      );
      expect(checkEndState(state)).toEqual({won: 'O', end: true});
    });

    it('O wins middle row', () => {
      const state = createGameState(
        [
          null, null, null,
          'O', 'O', 'O',
          null, null, null
        ],
        'X'
      );
      expect(checkEndState(state)).toEqual({won: 'O', end: true});
    });

    it('O wins bottom row', () => {
      const state = createGameState(
        [
          null, null, null,
          null, null, null,
          'O', 'O', 'O'
        ],
        'X'
      );
      expect(checkEndState(state)).toEqual({won: 'O', end: true});
    });

    it('O wins left column', () => {
      const state = createGameState(
        [
          'O', null, null,
          'O', null, null,
          'O', null, null
        ],
        'X'
      );
      expect(checkEndState(state)).toEqual({won: 'O', end: true});
    });

    it('O wins middle column', () => {
      const state = createGameState(
        [
          null, 'O', null,
          null, 'O', null,
          null, 'O', null
        ],
        'X'
      );
      expect(checkEndState(state)).toEqual({won: 'O', end: true});
    });

    it('O wins right column', () => {
      const state = createGameState(
        [
          null, null, 'O',
          null, null, 'O',
          null, null, 'O'
        ],
        'X'
      );
      expect(checkEndState(state)).toEqual({won: 'O', end: true});
    });

    it('O wins diagonal top-left to bottom-right', () => {
      const state = createGameState(
        [
          'O', null, null,
          null, 'O', null,
          null, null, 'O'
        ],
        'X'
      );
      expect(checkEndState(state)).toEqual({won: 'O', end: true});
    });

    it('O wins diagonal top-right to bottom-left', () => {
      const state = createGameState(
        [
          null, null, 'O',
          null, 'O', null,
          'O', null, null
        ],
        'X'
      );
      expect(checkEndState(state)).toEqual({won: 'O', end: true});
    });
  });

  describe('draw', () => {
    it('returns draw when board is full with no winner', () => {
      const state = createGameState(
        [
          'X', 'O', 'X',
          'O', 'X', 'O',
          'O', 'X', 'O'
        ],
        'X'
      );
      expect(checkEndState(state)).toEqual({won: null, end: true});
    });

    it('returns draw with alternating full board', () => {
      const state = createGameState(
        [
          'O', 'X', 'O',
          'X', 'O', 'X',
          'X', 'O', 'X'
        ],
        'O'
      );
      expect(checkEndState(state)).toEqual({won: null, end: true});
    });
  });

  describe('game continues', () => {
    it('returns undefined for board with some moves', () => {
      const state = createGameState(
        [
          'X', null, null,
          null, 'O', null,
          null, null, null
        ],
        'X'
      );
      expect(checkEndState(state)).toBeNull();
    });

    it('returns undefined with one empty cell remaining', () => {
      const state = createGameState(
        [
          'X', 'O', 'X',
          'O', 'X', 'O',
          'X', 'O', null
        ],
        'X'
      );
      expect(checkEndState(state)).toBeNull();
    });
  });
});
