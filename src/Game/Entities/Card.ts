import { VirusCardColor } from '../Enums/VirusCardColor';
import { VirusCardType } from '../Enums/VirusCardType';
import { Requirement } from './Requirements';
import { Board } from './Board';
import { Action } from './Action';
import { Entity } from '../../Utils/Entity';
import { uid } from '../../Utils/uid';

export type ICard = {
  id: string;
  cardId: string;
  name: string;
  type: VirusCardType;
  color: VirusCardColor;
  requirements?: Requirement[];
};

export interface Card extends ICard {}
export abstract class Card extends Entity<ICard> {
  abstract action(action: Action, board: Board): { board: Board; discard?: Card[] };

  constructor(card: ICard) {
    super(card);
    if (!this.id) {
      this.id = uid(6);
    }
  }
}

export type CardGenerator = () => Card;
