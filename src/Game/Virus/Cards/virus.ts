import { VirusCardType } from '../../Enums/VirusCardType';
import { VirusCardColor } from '../../Enums/VirusCardColor';
import { CardGenerator } from '../../Entities/Card';
import { requirement, RequirementApply, RequirementType } from '../../Entities/Requirements';
import { uid } from '../../../Utils/uid';
import { OrganCardState } from '../../Enums/OrganCardState';

function virusRequirement(color: VirusCardColor) {
  return [
    requirement(RequirementApply.Selection)
      .to(RequirementType.CardBoard)
      .cards(1)
      .type([VirusCardType.Organ])
      .state([OrganCardState.Free, OrganCardState.Infect, OrganCardState.Vaccinate])
      .color([color])
      .execute(),
  ];
}

export const multiVirus: CardGenerator = () => {
  return {
    id: uid(6),
    cardId: 'multiVirus',
    name: 'Multicolor virus',
    type: VirusCardType.Virus,
    color: VirusCardColor.Multi,
    requirements: virusRequirement(null),
  };
};

export const redVirus: CardGenerator = () => {
  return {
    id: uid(6),
    cardId: 'redVirus',
    name: 'Red Virus',
    type: VirusCardType.Virus,
    color: VirusCardColor.Red,
    requirements: virusRequirement(VirusCardColor.Red),
  };
};

export const greenVirus: CardGenerator = () => {
  return {
    id: uid(6),
    cardId: 'greenVirus',
    name: 'Green Virus',
    type: VirusCardType.Virus,
    color: VirusCardColor.Green,
    requirements: virusRequirement(VirusCardColor.Green),
  };
};

export const blueVirus: CardGenerator = () => {
  return {
    id: uid(6),
    cardId: 'blueVirus',
    name: 'Blue Virus',
    type: VirusCardType.Virus,
    color: VirusCardColor.Blue,
    requirements: virusRequirement(VirusCardColor.Blue),
  };
};

export const yellowVirus: CardGenerator = () => {
  return {
    id: uid(6),
    cardId: 'yellowVirus',
    name: 'Yellow Virus',
    type: VirusCardType.Virus,
    color: VirusCardColor.Yellow,
    requirements: virusRequirement(VirusCardColor.Yellow),
  };
};
