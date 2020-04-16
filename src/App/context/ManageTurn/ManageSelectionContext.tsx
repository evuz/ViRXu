import React, { createContext, useState, useCallback } from 'react';
import { Requirement } from '../../../Game/Entities/Requirements';

export const enum SelectionPlace {
  Board,
  Hand,
}

type SelectionRequirements = {
  place: SelectionPlace;
  requirements?: Requirement[];
};

type IManageSelectionContext = {
  setSelectionRequirements({ place, requirements }: SelectionRequirements): void;
  selectionRequirements: SelectionRequirements;
};

export const ManageSelectionContext = createContext<IManageSelectionContext>(null);

export function ManageSelectionState({ children }) {
  const [selectionRequirements, setSelectionRequirementsState] = useState<SelectionRequirements>({ place: null });

  const setSelectionRequirements = useCallback(({ place, requirements = [] }: SelectionRequirements) => {
    setSelectionRequirementsState({ place, requirements });
  }, []);

  const context = {
    selectionRequirements,
    setSelectionRequirements,
  };

  return <ManageSelectionContext.Provider value={context}>{children}</ManageSelectionContext.Provider>;
}
