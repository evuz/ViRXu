import { Action } from '../Action';
import { ActionPayloadPlay } from '../ActionPayload';
import { Card } from '../Card';
import { CardPlayed } from '../CardPlayed';
import { Player } from '../Player';
import { Requirement, RequirementApply, RequirementType } from '../Requirements';

export function requirementsValidator(
  action: Action<ActionPayloadPlay>,
  board: Map<Player, CardPlayed[]>,
): Array<{ key: string; message: string }> {
  board = new Map(board.entries());
  const { payload } = action;
  const player = getPlayer(<string>action.from);
  const allRequirements: Requirement[] = payload.cards.reduce((acc, card) => acc.concat(card.requirements || []), []);

  if (!allRequirements.length) {
    return null;
  }

  const rules = allRequirements.filter((requirement) => requirement.apply === RequirementApply.Rules);
  const validationRules = checkRules();

  return validationRules;

  function checkRules() {
    if (!rules.length) {
      return null;
    }

    const error = rules
      .map((rule) => {
        const cardsByType = getCardsByRequirementType(rule.type);

        const cardsValid = cardsByType
          .map((card) => {
            let isValid: boolean;

            isValid = rule.cardType ? rule.cardType.indexOf(card.type) > -1 : true;
            isValid = isValid && (rule.cardColor ? rule.cardColor.indexOf(card.color) > -1 : true);
            return isValid;
          })
          .filter((v) => !!v);
        if (cardsValid.length !== rule.quantity) {
          return { key: 'rule', message: 'Rule Error' };
        }
        return null;
      })
      .filter((value) => !!value);

    return error.length ? error : null;
  }

  function getCardsByRequirementType(type: RequirementType) {
    let cardsByPlayers: CardPlayed[][];
    if (type === RequirementType.CardBoard) {
      board.delete(player);
      cardsByPlayers = Array.from(board.values());
    }

    if (type === RequirementType.CardUser) {
      cardsByPlayers = [board.get(player)];
    }

    if (!cardsByPlayers) {
      throw Error('Your requirement type is not valid');
    }

    return cardsByPlayers.reduce((acc, cardsPlayed) => {
      const playerCards: Card[] = cardsPlayed.reduce((acc, cardPlayed) => {
        return acc.concat(cardPlayed.cards);
      }, []);
      return acc.concat(playerCards);
    }, <Card[]>[]);
  }

  function getPlayer(id: string) {
    const players = Array.from(board.keys());
    return players.filter((p) => p.getId() === id)[0];
  }
}
