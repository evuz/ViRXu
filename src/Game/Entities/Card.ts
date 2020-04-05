import { VirusCardColor } from '../Enums/VirusCardColor';
import { VirusCardType } from '../Enums/VirusCardType';
import { Requirement } from './Requirements';

export type Card = {
  id: string;
  name: string;
  type: VirusCardType;
  color: VirusCardColor;
  requirements?: Requirement[];
};
