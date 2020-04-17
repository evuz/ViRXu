import { VirusCardType } from '../../Enums/VirusCardType';
import { VirusCardColor } from '../../Enums/VirusCardColor';
import { Card } from '../../Entities/Card';
import { requirement, RequirementApply, RequirementType } from '../../Entities/Requirements';

function medicineRequirement(color: VirusCardColor) {
  return [
    requirement(RequirementApply.Selection)
      .to(RequirementType.CardUser)
      .cards(1)
      .type([VirusCardType.Organ])
      .color([color])
      .execute(),
  ];
}

export const kit: Card = {
  id: null,
  cardId: 'kit',
  name: 'First Aid Kit',
  type: VirusCardType.Medicine,
  color: VirusCardColor.Multi,
  requirements: medicineRequirement(null),
};

export const vaccine: Card = {
  id: null,
  cardId: 'vaccine',
  name: 'Vaccine',
  type: VirusCardType.Medicine,
  color: VirusCardColor.Red,
  requirements: medicineRequirement(VirusCardColor.Red),
};

export const syrup: Card = {
  id: null,
  cardId: 'syrup',
  name: 'Syrup',
  type: VirusCardType.Medicine,
  color: VirusCardColor.Green,
  requirements: medicineRequirement(VirusCardColor.Green),
};

export const pill: Card = {
  id: null,
  cardId: 'pill',
  name: 'Pill',
  type: VirusCardType.Medicine,
  color: VirusCardColor.Blue,
  requirements: medicineRequirement(VirusCardColor.Blue),
};

export const plaster: Card = {
  id: null,
  cardId: 'plaster',
  name: 'Plaster',
  type: VirusCardType.Medicine,
  color: VirusCardColor.Yellow,
  requirements: medicineRequirement(VirusCardColor.Yellow),
};
