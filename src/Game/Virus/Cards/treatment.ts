import { VirusCardType } from '../../Enums/VirusCardType';
import { VirusCardColor } from '../../Enums/VirusCardColor';
import { Card } from '../../Entities/Card';

export const infection: Card = {
  id: 'infection',
  name: 'Infection',
  type: VirusCardType.Treatment,
  color: VirusCardColor.Multi,
  action: () => {
    console.log('First Aid Kit');
  },
};

export const organThief: Card = {
  id: 'organThief',
  name: 'Organ thief',
  type: VirusCardType.Treatment,
  color: VirusCardColor.Multi,
  action: () => {
    console.log('Organ thief');
  },
};

export const transplant: Card = {
  id: 'transplant',
  name: 'Transplant',
  type: VirusCardType.Treatment,
  color: VirusCardColor.Multi,
  action: () => {
    console.log('Transplant');
  },
};

export const latexGlove: Card = {
  id: 'latexGlove',
  name: 'Latex glove',
  type: VirusCardType.Treatment,
  color: VirusCardColor.Multi,
  action: () => {
    console.log('Pill');
  },
};

export const medicalError: Card = {
  id: 'medicalError',
  name: 'Medical error',
  type: VirusCardType.Treatment,
  color: VirusCardColor.Multi,
  action: () => {
    console.log('Medical error');
  },
};
