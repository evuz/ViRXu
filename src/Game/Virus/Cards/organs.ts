import { CardGenerator } from '../../Entities/Card';
import { requirement, RequirementApply, RequirementType } from '../../Entities/Requirements';
import { VirusCardColor } from '../../Enums/VirusCardColor';
import { VirusCardType } from '../../Enums/VirusCardType';
import { uid } from '../../../Utils/uid';

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

export const multiOrgan: CardGenerator = () => {
  return {
    id: uid(6),
    cardId: 'multiOrgan',
    name: 'Multicolor organ',
    type: VirusCardType.Organ,
    color: VirusCardColor.Multi,
  };
};

export const heart: CardGenerator = () => {
  return {
    id: uid(6),
    cardId: 'heart',
    name: 'Heart',
    type: VirusCardType.Organ,
    color: VirusCardColor.Red,
    requirements: organsRequirement(VirusCardColor.Red),
  };
};

export const liver: CardGenerator = () => {
  return {
    id: uid(6),
    cardId: 'liver',
    name: 'Liver',
    type: VirusCardType.Organ,
    color: VirusCardColor.Green,
    requirements: organsRequirement(VirusCardColor.Green),
  };
};

export const brain: CardGenerator = () => {
  return {
    id: uid(6),
    cardId: 'brain',
    name: 'Brain',
    type: VirusCardType.Organ,
    color: VirusCardColor.Blue,
    requirements: organsRequirement(VirusCardColor.Blue),
  };
};

export const bone: CardGenerator = () => {
  return {
    id: uid(6),
    cardId: 'bone',
    name: 'Bone',
    type: VirusCardType.Organ,
    color: VirusCardColor.Yellow,
    requirements: organsRequirement(VirusCardColor.Yellow),
  };
};
