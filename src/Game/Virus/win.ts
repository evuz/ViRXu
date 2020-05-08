import { requirement, RequirementApply, RequirementType } from '../Entities/Requirements';
import { VirusCardType } from '../Enums/VirusCardType';
import { OrganCardState } from '../Enums/OrganCardState';
import { Board } from '../Entities/Board';
import { IPlayer } from '../Entities/Player';
import { requirementsValidator } from '../Entities/Requirements/Validators';
import { ActionPayloadPlay } from '../Entities/ActionPayload';
import { Action } from '../Entities/Action';
import { ActionsPayloadType } from '../Enums/ActionsPayloadType';

export function winRequirement() {
  return requirement(RequirementApply.Rules)
    .cards(2)
    .to(RequirementType.CardUser)
    .type([VirusCardType.Organ])
    .state([OrganCardState.Free, OrganCardState.Vaccinate, OrganCardState.Immnunise])
    .execute();
}

function createActionPlay(playerId: IPlayer['id']): Action<ActionPayloadPlay> {
  const cards: any = [{ requirements: [winRequirement()] }];
  return {
    id: null,
    to: null,
    from: playerId,
    payload: {
      action: ActionsPayloadType.Play,
      cards,
    },
  };
}

export function checkWin(board: Board): IPlayer['id'] | null {
  for (const [playerId] of board.entries()) {
    const errors = requirementsValidator(createActionPlay(playerId), board);
    if (!errors) {
      return playerId;
    }
  }
  return null;
}
