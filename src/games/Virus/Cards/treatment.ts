import { VirusCard, VirusCardColor, VirusCardType } from '../Entities/VirusCard';

export const infection: VirusCard = {
  id: 'infection',
  name: 'Infection',
  type: VirusCardType.Treatment,
  color: VirusCardColor.Multi,
  action: () => {
    console.log('First Aid Kit');
  },
};

export const organThief: VirusCard = {
  id: 'organThief',
  name: 'Organ thief',
  type: VirusCardType.Treatment,
  color: VirusCardColor.Multi,
  action: () => {
    console.log('Organ thief');
  },
};

export const transplant: VirusCard = {
  id: 'transplant',
  name: 'Transplant',
  type: VirusCardType.Treatment,
  color: VirusCardColor.Multi,
  action: () => {
    console.log('Transplant');
  },
};

export const latexGlove: VirusCard = {
  id: 'latexGlove',
  name: 'Latex glove',
  type: VirusCardType.Treatment,
  color: VirusCardColor.Multi,
  action: () => {
    console.log('Pill');
  },
};

export const medicalError: VirusCard = {
  id: 'medicalError',
  name: 'Medical error',
  type: VirusCardType.Treatment,
  color: VirusCardColor.Multi,
  action: () => {
    console.log('Medical error');
  },
};
