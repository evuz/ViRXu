import { VirusCardType } from '../../Enums/VirusCardType';
import { VirusCardColor } from '../../Enums/VirusCardColor';
import { Card } from '../../Entities/Card';
import { requirement, RequirementApply, RequirementType } from '../../Entities/Requirements';

function organsRequirement(color: VirusCardColor) {
  return [
    requirement(RequirementApply.Permission)
      .to(RequirementType.CardUser)
      .cards(1)
      .different(true)
      .type(VirusCardType.Organ)
      .color(color)
      .execute(),
  ];
}

export const multiOrgan: Card = {
  id: 'multiOrgan',
  name: 'Multicolor organ',
  type: VirusCardType.Organ,
  color: VirusCardColor.Multi,
  requirements: organsRequirement(null),
};

export const heart: Card = {
  id: 'heart',
  name: 'Heart',
  type: VirusCardType.Organ,
  color: VirusCardColor.Red,
  requirements: organsRequirement(VirusCardColor.Red),
};

export const liver: Card = {
  id: 'liver',
  name: 'Liver',
  type: VirusCardType.Organ,
  color: VirusCardColor.Green,
  requirements: organsRequirement(VirusCardColor.Green),
};

export const brain: Card = {
  id: 'brain',
  name: 'Brain',
  type: VirusCardType.Organ,
  color: VirusCardColor.Blue,
  requirements: organsRequirement(VirusCardColor.Blue),
};

export const bone: Card = {
  id: 'bone',
  name: 'Bone',
  type: VirusCardType.Organ,
  color: VirusCardColor.Yellow,
  requirements: organsRequirement(VirusCardColor.Yellow),
};
