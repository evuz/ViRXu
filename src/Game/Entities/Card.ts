import { VirusCardColor } from '../Enums/VirusCardColor';
import { VirusCardType } from '../Enums/VirusCardType';
import { Requirement } from './Requirements';

export type Card = {
  id: string;
  cardId: string;
  name: string;
  type: VirusCardType;
  color: VirusCardColor;
  requirements?: Requirement[];
};

export type CardGenerator = () => Card;
