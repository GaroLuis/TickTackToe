import React from 'react';
import { render, screen } from '@testing-library/react';
import Game, { GameState, EndState } from '../Game';
import '@/i18n';

describe('Game', () => {
  const defaultGameState: GameState = {
    board: [null, null, null, null, null, null, null, null, null],
    turn: 'X',
  };

  const defaultEndState: EndState = {
    won: null,
    end: false,
  };

  const setGameState = jest.fn();
  const setEndState = jest.fn();

  it('renders the game canvas', () => {
    render(
      <Game
        gameState={defaultGameState}
        setGameState={setGameState}
        endState={defaultEndState}
        setEndState={setEndState}
        chip="X"
      />
    );

    expect(screen.getByTestId('canvas')).toBeInTheDocument();
  });

  it('displays "Your turn!" when it is the player turn', () => {
    render(
      <Game
        gameState={defaultGameState}
        setGameState={setGameState}
        endState={defaultEndState}
        setEndState={setEndState}
        chip="X"
      />
    );

    expect(screen.getByText('Your turn!')).toBeInTheDocument();
  });

  it('does not display "Your turn!" when it is not the player turn', () => {
    render(
      <Game
        gameState={defaultGameState}
        setGameState={setGameState}
        endState={defaultEndState}
        setEndState={setEndState}
        chip="O"
      />
    );

    expect(screen.queryByText('Your turn!')).not.toBeInTheDocument();
  });

  it('displays "X WON!" when X wins', () => {
    const endState: EndState = { won: 'X', end: true };
    render(
      <Game
        gameState={defaultGameState}
        setGameState={setGameState}
        endState={endState}
        setEndState={setEndState}
        chip="X"
      />
    );

    expect(screen.getByText('X WON!')).toBeInTheDocument();
  });

  it('displays "O WON!" when O wins', () => {
    const endState: EndState = { won: 'O', end: true };
    render(
      <Game
        gameState={defaultGameState}
        setGameState={setGameState}
        endState={endState}
        setEndState={setEndState}
        chip="X"
      />
    );

    expect(screen.getByText('O WON!')).toBeInTheDocument();
  });

  it('displays "DRAW!" when game ends with no winner', () => {
    const endState: EndState = { won: null, end: true };
    render(
      <Game
        gameState={defaultGameState}
        setGameState={setGameState}
        endState={endState}
        setEndState={setEndState}
        chip="X"
      />
    );

    expect(screen.getByText('DRAW!')).toBeInTheDocument();
  });

  it('does not display turn message when game has ended', () => {
    const endState: EndState = { won: 'X', end: true };
    render(
      <Game
        gameState={defaultGameState}
        setGameState={setGameState}
        endState={endState}
        setEndState={setEndState}
        chip="X"
      />
    );

    expect(screen.queryByText('Your turn!')).not.toBeInTheDocument();
  });
});
