import { VirusCardColor } from '../Enums/VirusCardColor';
import { VirusCardType } from '../Enums/VirusCardType';

export type Card = {
  id: string;
  name: string;
  type: VirusCardType;
  color: VirusCardColor;
  action?: Function;
};
