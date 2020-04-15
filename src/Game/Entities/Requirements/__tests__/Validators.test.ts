import { ActionsPayloadType } from '../../../Enums/ActionsPayloadType';
import { EntitiesId } from '../../../Enums/EntitiesId';
import { VirusCardType } from '../../../Enums/VirusCardType';
import { bone, brain, heart, liver, multiOrgan } from '../../../Virus/Cards/organs';
import { Action } from '../../Action';
import { ActionPayloadPlay } from '../../ActionPayload';
import { Card } from '../../Card';
import { OrganCard, IOrganCard } from '../../OrganCard';
import { Player, playerGenerator } from '../../Player';
import { requirement, RequirementApply, RequirementType } from '../../Requirements';
import { requirementsValidator } from '../Validators';

function createBoard(cardsByPlayer: Card[][][]) {
  const board = new Map<Player, OrganCard[]>();
  const players = cardsByPlayer.map((cardsByBoard, id) => {
    const player = playerGenerator({ id: `${id}`, name: `Player ${id}` });
    const cardsPlayed = cardsByBoard.map((cards) => {
      const organ = <IOrganCard>cards[0];
      if (organ.type !== VirusCardType.Organ) {
        throw Error('First card must be an organ');
      }
      return {
        organ,
        cards: cards.slice(1),
        state: OrganCard.calculateState(cards),
      };
    });
    board.set(player, cardsPlayed);
    return player;
  });

  return [board, players] as const;
}

function createAction(from: string, payload: Omit<ActionPayloadPlay, 'action'>): Action<ActionPayloadPlay> {
  return {
    to: EntitiesId.Game,
    from,
    payload: {
      action: ActionsPayloadType.Play,
      ...payload,
    },
  };
}

describe('RequirementsValidator', () => {
  test("should return null if cards haven't requirements", () => {
    const [board, players] = createBoard([[[heart], [bone]], [[heart]]]);
    const validation = requirementsValidator(
      createAction(players[0].getId(), {
        cards: [{ ...brain, requirements: null }],
      }),
      board,
    );
    expect(validation).toBeNull();
  });

  describe('check rules', () => {
    describe('generics cases', () => {
      test('return valid (color)', () => {
        const [board, players] = createBoard([[[heart], [brain]], [[liver]]]);
        const validation = requirementsValidator(
          createAction(players[0].getId(), {
            cards: [
              {
                ...brain,
                requirements: [
                  requirement(RequirementApply.Rules)
                    .cards(0)
                    .to(RequirementType.CardBoard)
                    .color([brain.color])
                    .execute(),
                ],
              },
            ],
          }),
          board,
        );
        expect(validation).toBeNull();
      });

      test('return valid (type & color)', () => {
        const [board, players] = createBoard([[[heart], [brain]], [[brain]]]);
        const validation = requirementsValidator(
          createAction(players[0].getId(), {
            cards: [
              {
                ...brain,
                requirements: [
                  requirement(RequirementApply.Rules)
                    .cards(1)
                    .to(RequirementType.CardUser)
                    .type([VirusCardType.Organ])
                    .color([brain.color])
                    .execute(),
                ],
              },
            ],
          }),
          board,
        );
        expect(validation).toBeNull();
      });

      test('return error (color)', () => {
        const [board, players] = createBoard([[[heart], [brain]], [[liver]]]);
        const validation = requirementsValidator(
          createAction(players[0].getId(), {
            cards: [
              {
                ...brain,
                requirements: [
                  requirement(RequirementApply.Rules)
                    .cards(0)
                    .to(RequirementType.CardUser)
                    .color([brain.color])
                    .execute(),
                ],
              },
            ],
          }),
          board,
        );
        expect(validation).toBeTruthy();
      });

      test('return error (type & color)', () => {
        const [board, players] = createBoard([[[heart], [brain]], [[brain]]]);
        const validation = requirementsValidator(
          createAction(players[0].getId(), {
            cards: [
              {
                ...brain,
                requirements: [
                  requirement(RequirementApply.Rules)
                    .cards(0)
                    .to(RequirementType.CardUser)
                    .type([VirusCardType.Organ])
                    .color([brain.color])
                    .execute(),
                ],
              },
            ],
          }),
          board,
        );
        expect(validation).toBeTruthy();
      });
    });
  });

  describe('cards cases', () => {
    test('brain valid', () => {
      const [board, players] = createBoard([[[heart], [bone], [multiOrgan], [liver]]]);
      const validation = requirementsValidator(
        createAction(players[0].getId(), {
          cards: [brain],
        }),
        board,
      );
      expect(validation).toBeNull();
    });

    test('brain error', () => {
      const [board, players] = createBoard([[[heart], [brain], [multiOrgan], [liver]]]);
      const validation = requirementsValidator(
        createAction(players[0].getId(), {
          cards: [brain],
        }),
        board,
      );
      expect(validation).toBeTruthy();
    });

    test('heart valid', () => {
      const [board, players] = createBoard([[[brain], [bone], [multiOrgan], [liver]]]);
      const validation = requirementsValidator(
        createAction(players[0].getId(), {
          cards: [heart],
        }),
        board,
      );
      expect(validation).toBeNull();
    });

    test('heart error', () => {
      const [board, players] = createBoard([[[brain], [heart], [multiOrgan], [liver]]]);
      const validation = requirementsValidator(
        createAction(players[0].getId(), {
          cards: [heart],
        }),
        board,
      );
      expect(validation).toBeTruthy();
    });

    test('heart valid', () => {
      const [board, players] = createBoard([[[brain], [bone], [multiOrgan], [liver]]]);
      const validation = requirementsValidator(
        createAction(players[0].getId(), {
          cards: [heart],
        }),
        board,
      );
      expect(validation).toBeNull();
    });

    test('heart error', () => {
      const [board, players] = createBoard([[[brain], [heart], [multiOrgan], [liver]]]);
      const validation = requirementsValidator(
        createAction(players[0].getId(), {
          cards: [heart],
        }),
        board,
      );
      expect(validation).toBeTruthy();
    });

    test('bone valid', () => {
      const [board, players] = createBoard([[[brain], [heart], [multiOrgan], [liver]]]);
      const validation = requirementsValidator(
        createAction(players[0].getId(), {
          cards: [bone],
        }),
        board,
      );
      expect(validation).toBeNull();
    });

    test('bone error', () => {
      const [board, players] = createBoard([[[brain], [bone], [multiOrgan], [liver]]]);
      const validation = requirementsValidator(
        createAction(players[0].getId(), {
          cards: [bone],
        }),
        board,
      );
      expect(validation).toBeTruthy();
    });

    test('liver valid', () => {
      const [board, players] = createBoard([[[brain], [heart], [multiOrgan], [bone]]]);
      const validation = requirementsValidator(
        createAction(players[0].getId(), {
          cards: [liver],
        }),
        board,
      );
      expect(validation).toBeNull();
    });

    test('liver error', () => {
      const [board, players] = createBoard([[[brain], [heart], [multiOrgan], [liver]]]);
      const validation = requirementsValidator(
        createAction(players[0].getId(), {
          cards: [liver],
        }),
        board,
      );
      expect(validation).toBeTruthy();
    });

    test('multi organ valid', () => {
      const [board, players] = createBoard([[[brain], [heart], [liver], [bone]]]);
      const validation = requirementsValidator(
        createAction(players[0].getId(), {
          cards: [multiOrgan],
        }),
        board,
      );
      expect(validation).toBeNull();
    });

    test('multi organ error', () => {
      const [board, players] = createBoard([[[brain], [heart], [multiOrgan], [bone]]]);
      const validation = requirementsValidator(
        createAction(players[0].getId(), {
          cards: [multiOrgan],
        }),
        board,
      );
      expect(validation).toBeNull();
    });
  });
});
