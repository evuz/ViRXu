import { VirusCardType } from '../../Enums/VirusCardType';
import { VirusCardColor } from '../../Enums/VirusCardColor';
import { Card } from '../../Entities/Card';

export const multiOrgan: Card = {
  id: 'multiOrgan',
  name: 'Multicolor organ',
  type: VirusCardType.Organ,
  color: VirusCardColor.Multi,
};

export const heart: Card = {
  id: 'heart',
  name: 'Heart',
  type: VirusCardType.Organ,
  color: VirusCardColor.Red,
};

export const liver: Card = {
  id: 'liver',
  name: 'Liver',
  type: VirusCardType.Organ,
  color: VirusCardColor.Green,
};

export const brain: Card = {
  id: 'brain',
  name: 'Brain',
  type: VirusCardType.Organ,
  color: VirusCardColor.Blue,
};

export const bone: Card = {
  id: 'bone',
  name: 'Bone',
  type: VirusCardType.Organ,
  color: VirusCardColor.Yellow,
};
