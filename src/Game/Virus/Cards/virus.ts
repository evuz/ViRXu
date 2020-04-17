import { VirusCardType } from '../../Enums/VirusCardType';
import { VirusCardColor } from '../../Enums/VirusCardColor';
import { Card } from '../../Entities/Card';
import { requirement, RequirementApply, RequirementType } from '../../Entities/Requirements';

function virusRequirement(color: VirusCardColor) {
  return [
    requirement(RequirementApply.Selection)
      .to(RequirementType.CardBoard)
      .cards(1)
      .type([VirusCardType.Organ])
      .color([color])
      .execute(),
  ];
}

export const multiVirus: Card = {
  id: null,
  cardId: 'multiVirus',
  name: 'Multicolor virus',
  type: VirusCardType.Virus,
  color: VirusCardColor.Multi,
  requirements: virusRequirement(null),
};

export const redVirus: Card = {
  id: null,
  cardId: 'redVirus',
  name: 'Red Virus',
  type: VirusCardType.Virus,
  color: VirusCardColor.Red,
  requirements: virusRequirement(VirusCardColor.Red),
};

export const greenVirus: Card = {
  id: null,
  cardId: 'greenVirus',
  name: 'Green Virus',
  type: VirusCardType.Virus,
  color: VirusCardColor.Green,
  requirements: virusRequirement(VirusCardColor.Green),
};

export const blueVirus: Card = {
  id: null,
  cardId: 'blueVirus',
  name: 'Blue Virus',
  type: VirusCardType.Virus,
  color: VirusCardColor.Blue,
  requirements: virusRequirement(VirusCardColor.Blue),
};

export const yellowVirus: Card = {
  id: null,
  cardId: 'yellowVirus',
  name: 'Yellow Virus',
  type: VirusCardType.Virus,
  color: VirusCardColor.Yellow,
  requirements: virusRequirement(VirusCardColor.Yellow),
};
