import { VirusCardType } from '../../Enums/VirusCardType';
import { VirusCardColor } from '../../Enums/VirusCardColor';
import { CardGenerator } from '../../Entities/Card';
import { requirement, RequirementApply, RequirementType } from '../../Entities/Requirements';
import { uid } from '../../../Utils/uid';
import { OrganCardState } from '../../Enums/OrganCardState';

function medicineRequirement(color: VirusCardColor) {
  return [
    requirement(RequirementApply.Selection)
      .to(RequirementType.CardUser)
      .cards(1)
      .type([VirusCardType.Organ])
      .state([OrganCardState.Free, OrganCardState.Infect, OrganCardState.Vaccinate])
      .color([color])
      .execute(),
  ];
}

export const kit: CardGenerator = () => {
  return {
    id: uid(6),
    cardId: 'kit',
    name: 'First Aid Kit',
    type: VirusCardType.Medicine,
    color: VirusCardColor.Multi,
    requirements: medicineRequirement(null),
  };
};

export const vaccine: CardGenerator = () => {
  return {
    id: uid(6),
    cardId: 'vaccine',
    name: 'Vaccine',
    type: VirusCardType.Medicine,
    color: VirusCardColor.Red,
    requirements: medicineRequirement(VirusCardColor.Red),
  };
};

export const syrup: CardGenerator = () => {
  return {
    id: uid(6),
    cardId: 'syrup',
    name: 'Syrup',
    type: VirusCardType.Medicine,
    color: VirusCardColor.Green,
    requirements: medicineRequirement(VirusCardColor.Green),
  };
};

export const pill: CardGenerator = () => {
  return {
    id: uid(6),
    cardId: 'pill',
    name: 'Pill',
    type: VirusCardType.Medicine,
    color: VirusCardColor.Blue,
    requirements: medicineRequirement(VirusCardColor.Blue),
  };
};

export const plaster: CardGenerator = () => {
  return {
    id: uid(6),
    cardId: 'plaster',
    name: 'Plaster',
    type: VirusCardType.Medicine,
    color: VirusCardColor.Yellow,
    requirements: medicineRequirement(VirusCardColor.Yellow),
  };
};
