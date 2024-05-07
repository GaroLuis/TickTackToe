'use client'

import { useEffect, useRef, useState } from 'react';
import Game, { EndState, GameState } from '@/app/components/Game';

let ws: WebSocket;
if (typeof window !== 'undefined') {
  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';

  ws = new WebSocket(`${protocol}//localhost:3001/api/ws`);
  setInterval(() => {
    if (ws.readyState !== ws.OPEN) {
      ws = new WebSocket(`${protocol}//localhost:3001/api/ws`);
      return;
    }

    ws.send('{"event":"ping"}');
  }, 29000);
}

export default function Home() {
  const clientId = useRef()
  const clientChip = useRef()

  const [state, setState] = useState<GameState>({
    board: [
      null, null, null,
      null, null, null,
      null, null, null,
    ],
    turn: 'X',
  })

  const [endState, setEndState] = useState<EndState>({
    won: null,
    end: false,
  })

  useEffect(() => {
    const onMessage = (msg: MessageEvent) => {
      try {
        const event = JSON.parse(msg.data) as { event: string; detail: any };

        switch (event.event) {
          case 'gameStateR':
            setState(event.detail);
            break;
          case 'endStateR':
            setEndState(event.detail);
            break;
          case 'connectionR':
            const {id, chip, state} = event.detail;
            clientId.current = id;
            clientChip.current = chip;
            setState(state)
        }
      } catch (e) {
        // do nothing
      }
    };

    try {
      ws.addEventListener('message', onMessage);
    } catch (err) {
      // do nothing
    }

    return () => {
      ws.removeEventListener('message', onMessage);
    };
  }, []);

  return (
    <Game
      gameState={state}
      setGameState={(gameState: GameState) => {
        if (state.turn !== clientChip.current) {
          return;
        }

        ws.send(JSON.stringify({event: 'gameStateS', detail: gameState, id: clientId.current}))
      }}
      endState={endState}
      setEndState={setEndState}
      chip={clientChip.current}
    />
  );
}
