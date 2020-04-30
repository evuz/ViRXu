import { VirusCardType } from '../../Enums/VirusCardType';
import { VirusCardColor } from '../../Enums/VirusCardColor';
import { CardGenerator, Card } from '../../Entities/Card';
import { requirement, RequirementApply, RequirementType } from '../../Entities/Requirements';
import { uid } from '../../../Utils/uid';
import { OrganCardState } from '../../Enums/OrganCardState';
import { Action } from '../../Entities/Action';
import { Entity } from '../../../Utils/Entity';
import { Board } from '../../Entities/Board';
import { ActionPayloadPlay } from '../../Entities/ActionPayload';
import { getPlayer } from '../../../Utils/getPlayer';
import { OrganCard } from '../../Entities/OrganCard';

function virusRequirement(color: VirusCardColor[]) {
  return [
    requirement(RequirementApply.Selection)
      .to(RequirementType.CardBoard)
      .cards(1)
      .type([VirusCardType.Organ])
      .state([OrganCardState.Free, OrganCardState.Infect, OrganCardState.Vaccinate])
      .color(color ? [VirusCardColor.Multi].concat(color) : null)
      .execute(),
  ];
}

export interface Virus extends Card {}
export class Virus extends Entity<Card> {
  action(action: Action, board: Board) {
    const payload = <ActionPayloadPlay>action.payload;

    if (payload.requirements.length !== 1) {
      throw Error('Virus can only have one requirement');
    }

    let discard: Card[] = [];
    const saveBoard = new Map(board.entries());
    const player = getPlayer(<string>action.from, board);
    saveBoard.delete(player);

    const requirement = payload.requirements[0];

    const playerBoard = Array.from(saveBoard.values()).find((player) =>
      player.some((o) => o.organ.id === requirement.id),
    );
    const organIndex = playerBoard.findIndex((cards) => cards.organ.id === requirement.id);
    const organ = playerBoard[organIndex];
    switch (organ.state) {
      case OrganCardState.Free:
        organ.cards.push(this);
        break;
      case OrganCardState.Infect:
        discard = organ.cards.concat([organ.organ, this]);
        playerBoard.splice(organIndex, 1);
        break;
      case OrganCardState.Vaccinate:
        discard.push(organ.cards.pop());
        discard.push(this);
        break;
      default:
        throw Error('Invalid state');
    }
    organ.state = OrganCard.calculateState(organ.cards);
    return { board, discard };
  }
}

export const multiVirus: CardGenerator = () => {
  return new Virus({
    id: uid(6),
    cardId: 'multiVirus',
    name: 'Multicolor virus',
    type: VirusCardType.Virus,
    color: VirusCardColor.Multi,
    requirements: virusRequirement(null),
  });
};

export const redVirus: CardGenerator = () => {
  return new Virus({
    id: uid(6),
    cardId: 'redVirus',
    name: 'Red Virus',
    type: VirusCardType.Virus,
    color: VirusCardColor.Red,
    requirements: virusRequirement([VirusCardColor.Red]),
  });
};

export const greenVirus: CardGenerator = () => {
  return new Virus({
    id: uid(6),
    cardId: 'greenVirus',
    name: 'Green Virus',
    type: VirusCardType.Virus,
    color: VirusCardColor.Green,
    requirements: virusRequirement([VirusCardColor.Green]),
  });
};

export const blueVirus: CardGenerator = () => {
  return new Virus({
    id: uid(6),
    cardId: 'blueVirus',
    name: 'Blue Virus',
    type: VirusCardType.Virus,
    color: VirusCardColor.Blue,
    requirements: virusRequirement([VirusCardColor.Blue]),
  });
};

export const yellowVirus: CardGenerator = () => {
  return new Virus({
    id: uid(6),
    cardId: 'yellowVirus',
    name: 'Yellow Virus',
    type: VirusCardType.Virus,
    color: VirusCardColor.Yellow,
    requirements: virusRequirement([VirusCardColor.Yellow]),
  });
};
