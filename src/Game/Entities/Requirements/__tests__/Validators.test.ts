import { ActionsPayloadType } from '../../../Enums/ActionsPayloadType';
import { EntitiesId } from '../../../Enums/EntitiesId';
import { VirusCardType } from '../../../Enums/VirusCardType';
import { bone as b, brain as br, heart as h, liver as l, multiOrgan as mo } from '../../../Virus/Cards/organs';
import { pill as p, kit as fak, plaster as pl, syrup as s, vaccine as v } from '../../../Virus/Cards/medicines';
import {
  redVirus as rv,
  multiVirus as mv,
  yellowVirus as yv,
  blueVirus as bv,
  greenVirus as gv,
} from '../../../Virus/Cards/virus';
import { Action } from '../../Action';
import { ActionPayloadPlay } from '../../ActionPayload';
import { Card } from '../../Card';
import { OrganCard, IOrganCard } from '../../OrganCard';
import { requirement, RequirementApply, RequirementType } from '../../Requirements';
import { requirementsValidator } from '../Validators';
import { OrganCardState } from '../../../Enums/OrganCardState';
import { VirusCardColor } from '../../../Enums/VirusCardColor';
import { Board } from '../../Board';

function createBoard(cardsByPlayer: Card[][][]) {
  const board: Board = new Map();
  const players = cardsByPlayer.map((cardsByBoard, id) => {
    const player = { id: `${id}`, name: `Player ${id}` };
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
    board.set(player.id, cardsPlayed);
    return player;
  });

  return [board, players] as const;
}

function createAction(from: string, payload: Omit<ActionPayloadPlay, 'action'>): Action<ActionPayloadPlay> {
  return {
    id: null,
    to: EntitiesId.Game,
    from,
    payload: {
      action: ActionsPayloadType.Play,
      ...payload,
    },
  };
}

describe('RequirementsValidator', () => {
  let bone: Card;
  let brain: Card;
  let heart: Card;
  let liver: Card;
  let multiOrgan: Card;
  let pill: Card;
  let redVirus: Card;
  let kit: Card;
  let multiVirus: Card;
  let plaster: Card;
  let syrup: Card;
  let vaccine: Card;
  let yellowVirus: Card;
  let blueVirus: Card;
  let greenVirus: Card;

  beforeEach(() => {
    bone = b();
    brain = br();
    heart = h();
    liver = l();
    multiOrgan = mo();
    pill = p();
    redVirus = rv();
    kit = fak();
    multiVirus = mv();
    plaster = pl();
    syrup = s();
    vaccine = v();
    yellowVirus = yv();
    blueVirus = bv();
    greenVirus = gv();
  });

  test("should return null if cards haven't requirements", () => {
    const [board, players] = createBoard([[[heart], [bone]], [[heart]]]);
    const validation = requirementsValidator(
      createAction(players[0].id, {
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
          createAction(players[0].id, {
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
          createAction(players[0].id, {
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
          createAction(players[0].id, {
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
          createAction(players[0].id, {
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
        createAction(players[0].id, {
          cards: [brain],
        }),
        board,
      );
      expect(validation).toBeNull();
    });

    test('brain error', () => {
      const [board, players] = createBoard([[[heart], [brain], [multiOrgan], [liver]]]);
      const validation = requirementsValidator(
        createAction(players[0].id, {
          cards: [brain],
        }),
        board,
      );
      expect(validation).toBeTruthy();
    });

    test('heart valid', () => {
      const [board, players] = createBoard([[[brain], [bone], [multiOrgan], [liver]]]);
      const validation = requirementsValidator(
        createAction(players[0].id, {
          cards: [heart],
        }),
        board,
      );
      expect(validation).toBeNull();
    });

    test('heart error', () => {
      const [board, players] = createBoard([[[brain], [heart], [multiOrgan], [liver]]]);
      const validation = requirementsValidator(
        createAction(players[0].id, {
          cards: [heart],
        }),
        board,
      );
      expect(validation).toBeTruthy();
    });

    test('heart valid', () => {
      const [board, players] = createBoard([[[brain], [bone], [multiOrgan], [liver]]]);
      const validation = requirementsValidator(
        createAction(players[0].id, {
          cards: [heart],
        }),
        board,
      );
      expect(validation).toBeNull();
    });

    test('heart error', () => {
      const [board, players] = createBoard([[[brain], [heart], [multiOrgan], [liver]]]);
      const validation = requirementsValidator(
        createAction(players[0].id, {
          cards: [heart],
        }),
        board,
      );
      expect(validation).toBeTruthy();
    });

    test('bone valid', () => {
      const [board, players] = createBoard([[[brain], [heart], [multiOrgan], [liver]]]);
      const validation = requirementsValidator(
        createAction(players[0].id, {
          cards: [bone],
        }),
        board,
      );
      expect(validation).toBeNull();
    });

    test('bone error', () => {
      const [board, players] = createBoard([[[brain], [bone], [multiOrgan], [liver]]]);
      const validation = requirementsValidator(
        createAction(players[0].id, {
          cards: [bone],
        }),
        board,
      );
      expect(validation).toBeTruthy();
    });

    test('liver valid', () => {
      const [board, players] = createBoard([[[brain], [heart], [multiOrgan], [bone]]]);
      const validation = requirementsValidator(
        createAction(players[0].id, {
          cards: [liver],
        }),
        board,
      );
      expect(validation).toBeNull();
    });

    test('liver error', () => {
      const [board, players] = createBoard([[[brain], [heart], [multiOrgan], [liver]]]);
      const validation = requirementsValidator(
        createAction(players[0].id, {
          cards: [liver],
        }),
        board,
      );
      expect(validation).toBeTruthy();
    });

    test('multi organ valid', () => {
      const [board, players] = createBoard([[[brain], [heart], [liver], [bone]]]);
      const validation = requirementsValidator(
        createAction(players[0].id, {
          cards: [multiOrgan],
        }),
        board,
      );
      expect(validation).toBeNull();
    });

    test('multi organ error', () => {
      const [board, players] = createBoard([[[brain], [heart], [multiOrgan], [bone]]]);
      const validation = requirementsValidator(
        createAction(players[0].id, {
          cards: [multiOrgan],
        }),
        board,
      );
      expect(validation).toBeNull();
    });
  });

  describe('check selections', () => {
    describe('generic cases', () => {
      test('should return error because color is not included', () => {
        const [board, players] = createBoard([[[brain], [heart]], [[liver]]]);
        pill.requirements = [
          requirement(RequirementApply.Selection)
            .to(RequirementType.CardUser)
            .cards(1)
            .color([VirusCardColor.Blue])
            .execute(),
        ];
        const validation = requirementsValidator(
          createAction(players[0].id, {
            cards: [pill],
            requirements: [board.get(players[0].id)[1].organ],
          }),
          board,
        );
        expect(validation).not.toBeNull();
        expect(validation.map((v) => v.message)).toContain('Selection Error');
      });

      test('should return ok because color is included', () => {
        const [board, players] = createBoard([[[brain], [heart]], [[liver]]]);
        pill.requirements = [
          requirement(RequirementApply.Selection)
            .to(RequirementType.CardUser)
            .cards(1)
            .color([VirusCardColor.Blue, VirusCardColor.Red])
            .execute(),
        ];
        const validation = requirementsValidator(
          createAction(players[0].id, {
            cards: [pill],
            requirements: [board.get(players[0].id)[1].organ],
          }),
          board,
        );
        expect(validation).toBeNull();
      });

      test('should return ok because state is included', () => {
        const [board, players] = createBoard([[[brain], [heart]], [[liver]]]);
        const heartCard = board.get(players[0].id)[1];
        pill.requirements = [
          requirement(RequirementApply.Selection)
            .to(RequirementType.CardUser)
            .cards(1)
            .state([OrganCardState.Free, OrganCardState.Infect, OrganCardState.Vaccinate])
            .execute(),
        ];
        heartCard.state = OrganCardState.Free;
        const validation = requirementsValidator(
          createAction(players[0].id, {
            cards: [pill],
            requirements: [heartCard.organ],
          }),
          board,
        );
        expect(validation).toBeNull();
      });

      test('should return error because state is not included', () => {
        const [board, players] = createBoard([[[brain], [heart]], [[liver]]]);
        const brainCard = board.get(players[0].id)[0];
        pill.requirements = [
          requirement(RequirementApply.Selection)
            .to(RequirementType.CardUser)
            .cards(1)
            .state([OrganCardState.Free, OrganCardState.Infect, OrganCardState.Vaccinate])
            .execute(),
        ];
        brainCard.state = OrganCardState.Immnunise;
        const validation = requirementsValidator(
          createAction(players[0].id, {
            cards: [pill],
            requirements: [brainCard.organ],
          }),
          board,
        );
        expect(validation).not.toBeNull();
        expect(validation.map((v) => v.message)).toContain('Selection Error');
      });

      test('should no verify state if card selected is not a Organ', () => {
        const [board, players] = createBoard([[[brain], [heart]], [[heart, redVirus, redVirus]]]);
        const heartCard = board.get(players[1].id)[0];
        pill.requirements = [
          requirement(RequirementApply.Selection)
            .to(RequirementType.CardBoard)
            .cards(1)
            .state([OrganCardState.Free, OrganCardState.Infect, OrganCardState.Vaccinate])
            .execute(),
        ];
        heartCard.state = OrganCardState.Extirpate;
        const validation = requirementsValidator(
          createAction(players[0].id, {
            cards: [pill],
            requirements: [heartCard.cards[0]],
          }),
          board,
        );
        expect(validation).toBeNull();
      });

      test('should verify state even is null', () => {
        const [board, players] = createBoard([[[brain], [heart]], [[heart, redVirus, redVirus]]]);
        const heartCard = board.get(players[1].id)[0];
        pill.requirements = [
          requirement(RequirementApply.Selection)
            .to(RequirementType.CardBoard)
            .cards(1)
            .state([OrganCardState.Free, OrganCardState.Infect, OrganCardState.Vaccinate])
            .execute(),
        ];
        heartCard.state = null;
        const validation = requirementsValidator(
          createAction(players[0].id, {
            cards: [pill],
            requirements: [heartCard.organ],
          }),
          board,
        );
        expect(validation).not.toBeNull();
        expect(validation.map((v) => v.message)).toContain('Selection Error');
      });

      test('should return error because card is not in a board', () => {
        const [board, players] = createBoard([[[brain], [heart]], [[liver]]]);
        pill.requirements = [
          requirement(RequirementApply.Selection)
            .to(RequirementType.CardBoard)
            .cards(1)
            .type([VirusCardType.Organ])
            .state([OrganCardState.Free, OrganCardState.Infect, OrganCardState.Vaccinate])
            .color([VirusCardColor.Blue])
            .execute(),
        ];
        const validation = requirementsValidator(
          createAction(players[0].id, {
            cards: [pill],
            requirements: [multiOrgan],
          }),
          board,
        );
        expect(validation).not.toBeNull();
        expect(validation.map((v) => v.message)).toContain('Selection not allowed');
      });

      test('should return error because  card is not in a correct board (user board)', () => {
        const [board, players] = createBoard([[[brain], [heart]], [[liver]]]);
        pill.requirements = [
          requirement(RequirementApply.Selection)
            .to(RequirementType.CardUser)
            .cards(1)
            .type([VirusCardType.Organ])
            .state([OrganCardState.Free, OrganCardState.Infect, OrganCardState.Vaccinate])
            .color([VirusCardColor.Blue])
            .execute(),
        ];
        const validation = requirementsValidator(
          createAction(players[0].id, {
            cards: [pill],
            requirements: [board.get(players[1].id)[0].organ],
          }),
          board,
        );
        expect(validation).not.toBeNull();
        expect(validation.map((v) => v.message)).toContain('Selection not allowed');
      });

      test('should return error because card is not in a correct board (board)', () => {
        const [board, players] = createBoard([[[brain], [heart]], [[liver]]]);
        pill.requirements = [
          requirement(RequirementApply.Selection)
            .to(RequirementType.CardBoard)
            .cards(1)
            .type([VirusCardType.Organ])
            .state([OrganCardState.Free, OrganCardState.Infect, OrganCardState.Vaccinate])
            .color([VirusCardColor.Blue])
            .execute(),
        ];
        const validation = requirementsValidator(
          createAction(players[0].id, {
            cards: [pill],
            requirements: [board.get(players[0].id)[1].organ],
          }),
          board,
        );
        expect(validation).not.toBeNull();
        expect(validation.map((v) => v.message)).toContain('Selection not allowed');
      });
    });

    describe('cards multi colors', () => {
      test('first aid kit should return valid with all organs', () => {
        const [board, players] = createBoard([[[brain], [heart], [liver], [bone]]]);
        board.get(players[0].id).forEach((card) => {
          const validation = requirementsValidator(
            createAction(players[0].id, {
              cards: [kit],
              requirements: [card.organ],
            }),
            board,
          );
          expect(validation).toBeNull();
        });
      });

      test('multi virus should return valid with all organs', () => {
        const [board, players] = createBoard([[], [[brain], [liver], [heart], [bone]]]);
        board.get(players[1].id).forEach((card) => {
          const validation = requirementsValidator(
            createAction(players[0].id, {
              cards: [multiVirus],
              requirements: [card.organ],
            }),
            board,
          );
          expect(validation).toBeNull();
        });
      });

      test('multi organ return valid with all medicine and virus', () => {
        const [board, players] = createBoard([[[multiOrgan]], [[mo()]]]);
        [plaster, syrup, vaccine, pill, kit].forEach((medicine) => {
          const validation = requirementsValidator(
            createAction(players[0].id, {
              cards: [medicine],
              requirements: [board.get(players[0].id)[0].organ],
            }),
            board,
          );
          expect(validation).toBeNull();
        });

        [yellowVirus, greenVirus, redVirus, blueVirus, multiVirus].forEach((medicine) => {
          const validation = requirementsValidator(
            createAction(players[0].id, {
              cards: [medicine],
              requirements: [board.get(players[1].id)[0].organ],
            }),
            board,
          );
          expect(validation).toBeNull();
        });
      });
    });
  });
});
