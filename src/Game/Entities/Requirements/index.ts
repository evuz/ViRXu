import { VirusCardColor } from '../../Enums/VirusCardColor';
import { VirusCardType } from '../../Enums/VirusCardType';
import { OrganCardState } from '../../Enums/OrganCardState';

export const enum RequirementType {
  CardBoard,
  CardUser,
}

export const enum RequirementApply {
  Selection,
  Rules,
}

export type Requirement = {
  type: RequirementType;
  apply: RequirementApply;
  quantity: number;
  cardState?: OrganCardState[];
  cardType?: VirusCardType[];
  cardColor?: VirusCardColor[];
};

export function requirement(apply: RequirementApply) {
  let typeValue: RequirementType;
  let quantity = 1;
  let cardState: OrganCardState[];
  let cardType: VirusCardType[];
  let cardColor: VirusCardColor[];

  function to(v: RequirementType) {
    typeValue = v;
    return actions;
  }

  function cards(v: number) {
    quantity = v;
    return actions;
  }

  function type(v: VirusCardType[]) {
    cardType = v;
    return actions;
  }

  function color(v: VirusCardColor[]) {
    cardColor = v;
    return actions;
  }

  function state(v: OrganCardState[]) {
    cardState = v;
    return actions;
  }

  function execute(): Requirement {
    return {
      type: typeValue,
      apply,
      quantity,
      cardType,
      cardColor,
      cardState,
    };
  }

  const actions = {
    execute,
    to,
    cards,
    type,
    color,
    state,
  };

  return actions;
}
