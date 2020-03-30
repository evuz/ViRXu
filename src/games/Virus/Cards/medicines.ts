import { VirusCard, VirusCardColor, VirusCardType } from '../Entities/VirusCard';

export const kit: VirusCard = {
  id: 'kit',
  name: 'First Aid Kit',
  type: VirusCardType.Medicine,
  color: VirusCardColor.Multi,
};

export const vaccine: VirusCard = {
  id: 'vaccine',
  name: 'Vaccine',
  type: VirusCardType.Medicine,
  color: VirusCardColor.Red,
};

export const syrup: VirusCard = {
  id: 'syrup',
  name: 'Syrup',
  type: VirusCardType.Medicine,
  color: VirusCardColor.Green,
};

export const pill: VirusCard = {
  id: 'pill',
  name: 'Pill',
  type: VirusCardType.Medicine,
  color: VirusCardColor.Blue,
};

export const plaster: VirusCard = {
  id: 'plaster',
  name: 'Plaster',
  type: VirusCardType.Medicine,
  color: VirusCardColor.Yellow,
};
