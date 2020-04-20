import { Action } from '../Action';
import { ActionPayloadPlay } from '../ActionPayload';
import { Card } from '../Card';
import { OrganCard } from '../OrganCard';
import { Requirement, RequirementApply, RequirementType } from '../Requirements';
import { OrganCardState } from '../../Enums/OrganCardState';
import { VirusCardType } from '../../Enums/VirusCardType';
import { Board } from '../Board';
import { getPlayer } from '../../../Utils/getPlayer';

type Organ = Card & {
  state: OrganCardState;
};

export type ErrorMessage = { key: string; message: string };

export function requirementsValidator(action: Action<ActionPayloadPlay>, board: Board): ErrorMessage[] {
  board = new Map(board.entries());
  const { payload } = action;
  const player = getPlayer(<string>action.from, board);
  const allRequirements: Requirement[] = payload.cards.reduce((acc, card) => acc.concat(card.requirements || []), []);

  if (!allRequirements.length) {
    return null;
  }

  const rulesRequirements = allRequirements.filter((r) => r.apply === RequirementApply.Rules);
  const validationRulesRequirements = checkRules();

  const selectionsRequirements = allRequirements.filter((r) => r.apply === RequirementApply.Selection);
  const validationSelectionRequirements = checkValidations();

  const validations = validationRulesRequirements || validationSelectionRequirements;

  return validations || null;

  function checkValidations() {
    if (!selectionsRequirements.length) {
      return null;
    }
    const cardsSelected = payload.requirements || [];

    const error = selectionsRequirements
      .map((requirement) => {
        const cardsByType = getCardsByRequirementType(requirement.type);

        const selectionsFromBoard = cardsSelected
          .map((card) => cardsByType.find((c) => c.id === card.id))
          .filter((card) => !!card);

        if (selectionsFromBoard.length !== cardsSelected.length) {
          return { key: 'selection', message: 'Selection not allowed' };
        }

        const cardsValid = validator(selectionsFromBoard, requirement);

        if (cardsValid.length !== requirement.quantity) {
          return { key: 'selection', message: 'Selection Error' };
        }

        return null;
      })
      .filter((value) => !!value);

    return error.length ? error : null;
  }

  function checkRules() {
    if (!rulesRequirements.length) {
      return null;
    }

    const error = rulesRequirements
      .map((requirement) => {
        const cardsByType = getCardsByRequirementType(requirement.type);

        const cardsValid = validator(cardsByType, requirement);

        if (cardsValid.length !== requirement.quantity) {
          return { key: 'rule', message: 'Rule Error' };
        }

        return null;
      })
      .filter((value) => !!value);

    return error.length ? error : null;
  }

  function getCardsByRequirementType(type: RequirementType) {
    let organsByPlayers: OrganCard[][];
    if (type === RequirementType.CardBoard) {
      board.delete(player);
      organsByPlayers = Array.from(board.values());
    }

    if (type === RequirementType.CardUser) {
      organsByPlayers = [board.get(player)];
    }

    if (!organsByPlayers) {
      throw Error('Your requirement type is not valid');
    }

    return organsByPlayers.reduce((acc, organsCard) => {
      const playerCards: Card[] = organsCard.reduce((acc, organCard) => {
        const organ: Organ = Object.assign({}, organCard.organ, { state: organCard.state });
        return acc.concat(organCard.cards, organ);
      }, []);
      return acc.concat(playerCards);
    }, <Card[]>[]);
  }
}

function validator(cards: Card[], requirement: Requirement): boolean[] {
  return cards
    .map((card) => {
      let isValid: boolean;

      isValid = requirement.cardType ? requirement.cardType.indexOf(card.type) > -1 : true;
      isValid = isValid && (requirement.cardColor ? requirement.cardColor.indexOf(card.color) > -1 : true);

      if (card.type === VirusCardType.Organ && requirement.cardState) {
        isValid = isValid && requirement.cardState.indexOf((<Organ>card).state) > -1;
      }

      return isValid;
    })
    .filter((value) => !!value);
}
