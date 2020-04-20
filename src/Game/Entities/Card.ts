import { VirusCardColor } from '../Enums/VirusCardColor';
import { VirusCardType } from '../Enums/VirusCardType';
import { Requirement } from './Requirements';
import { Board } from './Board';
import { Action } from './Action';

export type Card = {
  id: string;
  cardId: string;
  name: string;
  type: VirusCardType;
  color: VirusCardColor;
  requirements?: Requirement[];
  action?(action: Action, board: Board): Board;
};

export type CardGenerator = () => Card;
