import { VirusCard, VirusCardColor, VirusCardType } from '../Entities/VirusCard';

export const multiOrgan: VirusCard = {
  id: 'multiOrgan',
  name: 'Multicolor organ',
  type: VirusCardType.Organ,
  color: VirusCardColor.Multi,
};

export const heart: VirusCard = {
  id: 'heart',
  name: 'Heart',
  type: VirusCardType.Organ,
  color: VirusCardColor.Red,
};

export const liver: VirusCard = {
  id: 'liver',
  name: 'Liver',
  type: VirusCardType.Organ,
  color: VirusCardColor.Green,
};

export const brain: VirusCard = {
  id: 'brain',
  name: 'Brain',
  type: VirusCardType.Organ,
  color: VirusCardColor.Blue,
};

export const bone: VirusCard = {
  id: 'bone',
  name: 'Bone',
  type: VirusCardType.Organ,
  color: VirusCardColor.Yellow,
};
