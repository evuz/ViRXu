import React, { createContext, useState } from 'react';

export const enum Turn {
  Board,
  Hand,
}

type IManageTurnContext = {
  setTurn(game: Turn): void;
  turn: Turn;
};

export const ManageTurnContext = createContext<IManageTurnContext>(null);

export function ManageTurnState({ children }) {
  const [turn, setTurn] = useState<Turn>(null);

  const context = {
    turn,
    setTurn,
  };

  return <ManageTurnContext.Provider value={context}>{children}</ManageTurnContext.Provider>;
}
