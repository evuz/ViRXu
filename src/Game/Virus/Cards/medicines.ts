import { VirusCardType } from '../../Enums/VirusCardType';
import { VirusCardColor } from '../../Enums/VirusCardColor';
import { Card } from '../../Entities/Card';

export const kit: Card = {
  id: 'kit',
  name: 'First Aid Kit',
  type: VirusCardType.Medicine,
  color: VirusCardColor.Multi,
};

export const vaccine: Card = {
  id: 'vaccine',
  name: 'Vaccine',
  type: VirusCardType.Medicine,
  color: VirusCardColor.Red,
};

export const syrup: Card = {
  id: 'syrup',
  name: 'Syrup',
  type: VirusCardType.Medicine,
  color: VirusCardColor.Green,
};

export const pill: Card = {
  id: 'pill',
  name: 'Pill',
  type: VirusCardType.Medicine,
  color: VirusCardColor.Blue,
};

export const plaster: Card = {
  id: 'plaster',
  name: 'Plaster',
  type: VirusCardType.Medicine,
  color: VirusCardColor.Yellow,
};
