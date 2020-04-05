import { VirusCardType } from '../Enums/VirusCardType';
import { VirusCardColor } from '../Enums/VirusCardColor';

export const enum RequirementType {
  CardBoard,
  CardUser,
}

export const enum RequirementApply {
  Selection,
  Permission,
}

export type Requirement = {
  type: RequirementType;
  apply: RequirementApply;
  different: boolean;
  quantity: number;
  cardType?: VirusCardType;
  cardColor?: VirusCardColor;
};

export function requirement(apply: RequirementApply) {
  let typeValue: RequirementType;
  let quantity = 1;
  let isDifferent = false;
  let cardType: VirusCardType;
  let cardColor: VirusCardColor;

  function to(v: RequirementType) {
    typeValue = v;
    return actions;
  }

  function cards(v: number) {
    quantity = v;
    return actions;
  }

  function type(v: VirusCardType) {
    cardType = v;
    return actions;
  }

  function color(v: VirusCardColor) {
    cardColor = v;
    return actions;
  }

  function different(v: boolean) {
    isDifferent = v;
    return actions;
  }

  function execute(): Requirement {
    return {
      type: typeValue,
      different: isDifferent,
      apply,
      quantity,
      cardType,
      cardColor,
    };
  }

  const actions = {
    execute,
    to,
    cards,
    type,
    color,
    different,
  };

  return actions;
}
