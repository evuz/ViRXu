import React, { createContext, useState } from 'react';
import { Card } from '../../../Game/Entities/Card';

export const enum SelectionPlace {
  Board,
  Hand,
}

type SelectionRequirements = {
  place: SelectionPlace;
  card?: Card;
};

type IManageSelectionContext = {
  setSelectionRequirements({ place, card }: SelectionRequirements): void;
  selectionRequirements: SelectionRequirements;
};

export const ManageSelectionContext = createContext<IManageSelectionContext>(null);

export function ManageSelectionState({ children }) {
  const [selectionRequirements, setSelectionRequirements] = useState<SelectionRequirements>({ place: null });

  const context = {
    selectionRequirements,
    setSelectionRequirements,
  };

  return <ManageSelectionContext.Provider value={context}>{children}</ManageSelectionContext.Provider>;
}
