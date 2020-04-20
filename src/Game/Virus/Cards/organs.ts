import { CardGenerator, Card } from '../../Entities/Card';
import { requirement, RequirementApply, RequirementType } from '../../Entities/Requirements';
import { VirusCardColor } from '../../Enums/VirusCardColor';
import { VirusCardType } from '../../Enums/VirusCardType';
import { uid } from '../../../Utils/uid';
import { Entity } from '../../../Utils/Entity';
import { Action } from '../../Entities/Action';
import { Board } from '../../Entities/Board';
import { ActionPayloadPlay } from '../../Entities/ActionPayload';
import { getPlayer } from '../../../Utils/getPlayer';
import { IOrganCard, OrganCard } from '../../Entities/OrganCard';

function organsRequirement(color: VirusCardColor) {
  return [
    requirement(RequirementApply.Rules)
      .cards(0)
      .to(RequirementType.CardUser)
      .type([VirusCardType.Organ])
      .color([color])
      .execute(),
  ];
}

export interface Organ extends Card {}
export class Organ extends Entity<Card> {
  action(action: Action, board: Board): Board {
    const payload = <ActionPayloadPlay>action.payload;
    const player = getPlayer(<string>action.from, board);
    const playerBoard = board.get(player);

    board.set(
      player,
      playerBoard.concat([{ cards: [], organ: <IOrganCard>this, state: OrganCard.calculateState(payload.cards) }]),
    );
    return board;
  }
}

export const multiOrgan: CardGenerator = () => {
  return new Organ({
    id: uid(6),
    cardId: 'multiOrgan',
    name: 'Multicolor organ',
    type: VirusCardType.Organ,
    color: VirusCardColor.Multi,
  });
};

export const heart: CardGenerator = () => {
  return new Organ({
    id: uid(6),
    cardId: 'heart',
    name: 'Heart',
    type: VirusCardType.Organ,
    color: VirusCardColor.Red,
    requirements: organsRequirement(VirusCardColor.Red),
  });
};

export const liver: CardGenerator = () => {
  return new Organ({
    id: uid(6),
    cardId: 'liver',
    name: 'Liver',
    type: VirusCardType.Organ,
    color: VirusCardColor.Green,
    requirements: organsRequirement(VirusCardColor.Green),
  });
};

export const brain: CardGenerator = () => {
  return new Organ({
    id: uid(6),
    cardId: 'brain',
    name: 'Brain',
    type: VirusCardType.Organ,
    color: VirusCardColor.Blue,
    requirements: organsRequirement(VirusCardColor.Blue),
  });
};

export const bone: CardGenerator = () => {
  return new Organ({
    id: uid(6),
    cardId: 'bone',
    name: 'Bone',
    type: VirusCardType.Organ,
    color: VirusCardColor.Yellow,
    requirements: organsRequirement(VirusCardColor.Yellow),
  });
};
