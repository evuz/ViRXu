import { VirusCardType } from '../../Enums/VirusCardType';
import { VirusCardColor } from '../../Enums/VirusCardColor';
import { CardGenerator, Card } from '../../Entities/Card';
import { uid } from '../../../Utils/uid';

export class Treatment extends Card {
  action(): any {
    throw Error('Action is not implemented yet');
  }
}

export const infection: CardGenerator = () => {
  return new Treatment({
    id: uid(6),
    cardId: 'infection',
    name: 'Infection',
    type: VirusCardType.Treatment,
    color: VirusCardColor.Multi,
  });
};

export const organThief: CardGenerator = () => {
  return new Treatment({
    id: uid(6),
    cardId: 'organThief',
    name: 'Organ thief',
    type: VirusCardType.Treatment,
    color: VirusCardColor.Multi,
  });
};

export const transplant: CardGenerator = () => {
  return new Treatment({
    id: uid(6),
    cardId: 'transplant',
    name: 'Transplant',
    type: VirusCardType.Treatment,
    color: VirusCardColor.Multi,
  });
};

export const latexGlove: CardGenerator = () => {
  return new Treatment({
    id: uid(6),
    cardId: 'latexGlove',
    name: 'Latex glove',
    type: VirusCardType.Treatment,
    color: VirusCardColor.Multi,
  });
};

export const medicalError: CardGenerator = () => {
  return new Treatment({
    id: uid(6),
    cardId: 'medicalError',
    name: 'Medical error',
    type: VirusCardType.Treatment,
    color: VirusCardColor.Multi,
  });
};
