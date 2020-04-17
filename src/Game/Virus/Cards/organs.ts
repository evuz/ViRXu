import { Card } from '../../Entities/Card';
import { requirement, RequirementApply, RequirementType } from '../../Entities/Requirements';
import { VirusCardColor } from '../../Enums/VirusCardColor';
import { VirusCardType } from '../../Enums/VirusCardType';

function organsRequirement(color: VirusCardColor) {
  return [
    requirement(RequirementApply.Rules)
      .cards(0)
      .to(RequirementType.CardUser)
      .type([VirusCardType.Organ])
      .color([color])
      .execute(),
  ];
}

export const multiOrgan: Card = {
  id: null,
  cardId: 'multiOrgan',
  name: 'Multicolor organ',
  type: VirusCardType.Organ,
  color: VirusCardColor.Multi,
};

export const heart: Card = {
  id: null,
  cardId: 'heart',
  name: 'Heart',
  type: VirusCardType.Organ,
  color: VirusCardColor.Red,
  requirements: organsRequirement(VirusCardColor.Red),
};

export const liver: Card = {
  id: null,
  cardId: 'liver',
  name: 'Liver',
  type: VirusCardType.Organ,
  color: VirusCardColor.Green,
  requirements: organsRequirement(VirusCardColor.Green),
};

export const brain: Card = {
  id: null,
  cardId: 'brain',
  name: 'Brain',
  type: VirusCardType.Organ,
  color: VirusCardColor.Blue,
  requirements: organsRequirement(VirusCardColor.Blue),
};

export const bone: Card = {
  id: null,
  cardId: 'bone',
  name: 'Bone',
  type: VirusCardType.Organ,
  color: VirusCardColor.Yellow,
  requirements: organsRequirement(VirusCardColor.Yellow),
};
