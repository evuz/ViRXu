import { VirusCardType } from '../../Enums/VirusCardType';
import { VirusCardColor } from '../../Enums/VirusCardColor';
import { Card } from '../../Entities/Card';

export const infection: Card = {
  id: null,
  cardId: 'infection',
  name: 'Infection',
  type: VirusCardType.Treatment,
  color: VirusCardColor.Multi,
};

export const organThief: Card = {
  id: null,
  cardId: 'organThief',
  name: 'Organ thief',
  type: VirusCardType.Treatment,
  color: VirusCardColor.Multi,
};

export const transplant: Card = {
  id: null,
  cardId: 'transplant',
  name: 'Transplant',
  type: VirusCardType.Treatment,
  color: VirusCardColor.Multi,
};

export const latexGlove: Card = {
  id: null,
  cardId: 'latexGlove',
  name: 'Latex glove',
  type: VirusCardType.Treatment,
  color: VirusCardColor.Multi,
};

export const medicalError: Card = {
  id: null,
  cardId: 'medicalError',
  name: 'Medical error',
  type: VirusCardType.Treatment,
  color: VirusCardColor.Multi,
};
