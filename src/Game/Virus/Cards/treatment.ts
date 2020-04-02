import { VirusCardType } from '../../Enums/VirusCardType';
import { VirusCardColor } from '../../Enums/VirusCardColor';
import { Card } from '../../Entities/Card';

export const infection: Card = {
  id: 'infection',
  name: 'Infection',
  type: VirusCardType.Treatment,
  color: VirusCardColor.Multi,
};

export const organThief: Card = {
  id: 'organThief',
  name: 'Organ thief',
  type: VirusCardType.Treatment,
  color: VirusCardColor.Multi,
};

export const transplant: Card = {
  id: 'transplant',
  name: 'Transplant',
  type: VirusCardType.Treatment,
  color: VirusCardColor.Multi,
};

export const latexGlove: Card = {
  id: 'latexGlove',
  name: 'Latex glove',
  type: VirusCardType.Treatment,
  color: VirusCardColor.Multi,
};

export const medicalError: Card = {
  id: 'medicalError',
  name: 'Medical error',
  type: VirusCardType.Treatment,
  color: VirusCardColor.Multi,
};
