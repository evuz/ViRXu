import { VirusCardType } from '../../Enums/VirusCardType';
import { VirusCardColor } from '../../Enums/VirusCardColor';
import { CardGenerator, Card } from '../../Entities/Card';
import { requirement, RequirementApply, RequirementType } from '../../Entities/Requirements';
import { uid } from '../../../Utils/uid';
import { OrganCardState } from '../../Enums/OrganCardState';
import { Entity } from '../../../Utils/Entity';
import { Action } from '../../Entities/Action';
import { Board } from '../../Entities/Board';
import { getPlayer } from '../../../Utils/getPlayer';
import { ActionPayloadPlay } from '../../Entities/ActionPayload';
import { OrganCard } from '../../Entities/OrganCard';

function medicineRequirement(color: VirusCardColor[]) {
  return [
    requirement(RequirementApply.Selection)
      .to(RequirementType.CardUser)
      .cards(1)
      .type([VirusCardType.Organ])
      .state([OrganCardState.Free, OrganCardState.Infect, OrganCardState.Vaccinate])
      .color(color ? [VirusCardColor.Multi].concat(color) : null)
      .execute(),
  ];
}

export interface Medicine extends Card {}
export class Medicine extends Entity<Card> {
  action(action: Action, board: Board) {
    const discard: Card[] = [];
    const payload = <ActionPayloadPlay>action.payload;
    const player = getPlayer(<string>action.from, board);
    const playerBoard = board.get(player);

    if (payload.requirements.length !== 1) {
      throw Error('Medicine can only have one requirement');
    }

    const requirement = payload.requirements[0];

    const organ = playerBoard.find((cards) => cards.organ.id === requirement.id);
    switch (organ.state) {
      case OrganCardState.Free:
      case OrganCardState.Vaccinate:
        organ.cards.push(this);
        break;
      case OrganCardState.Infect:
        discard.push(organ.cards.pop());
        discard.push(this);
        break;
      default:
        throw Error('Invalid state');
    }
    organ.state = OrganCard.calculateState(organ.cards);
    return { board, discard: discard.length ? discard : null };
  }
}

export const kit: CardGenerator = () => {
  return new Medicine({
    id: uid(6),
    cardId: 'kit',
    name: 'First Aid Kit',
    type: VirusCardType.Medicine,
    color: VirusCardColor.Multi,
    requirements: medicineRequirement(null),
  });
};

export const vaccine: CardGenerator = () => {
  return new Medicine({
    id: uid(6),
    cardId: 'vaccine',
    name: 'Vaccine',
    type: VirusCardType.Medicine,
    color: VirusCardColor.Red,
    requirements: medicineRequirement([VirusCardColor.Red]),
  });
};

export const syrup: CardGenerator = () => {
  return new Medicine({
    id: uid(6),
    cardId: 'syrup',
    name: 'Syrup',
    type: VirusCardType.Medicine,
    color: VirusCardColor.Green,
    requirements: medicineRequirement([VirusCardColor.Green]),
  });
};

export const pill: CardGenerator = () => {
  return new Medicine({
    id: uid(6),
    cardId: 'pill',
    name: 'Pill',
    type: VirusCardType.Medicine,
    color: VirusCardColor.Blue,
    requirements: medicineRequirement([VirusCardColor.Blue]),
  });
};

export const plaster: CardGenerator = () => {
  return new Medicine({
    id: uid(6),
    cardId: 'plaster',
    name: 'Plaster',
    type: VirusCardType.Medicine,
    color: VirusCardColor.Yellow,
    requirements: medicineRequirement([VirusCardColor.Yellow]),
  });
};
