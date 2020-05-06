import { searchCard } from '../searchCard';

describe('seach card', () => {
  test('should call callback fn', () => {
    const callback = jest.fn();
    const obj = {
      id: '12',
      cards: [{ cardId: 3 }, { cardId: 9 }, { cardId: 13 }],
      requeriments: {
        name: 'Test',
        element: { cardId: 22 },
      },
    };
    searchCard(obj, callback);
    expect(callback).toBeCalledTimes(4);
  });

  test('should create a new object change card object', () => {
    const callback = (card) => ({ id: card.cardId });
    const obj = {
      id: '12',
      cards: [{ cardId: 3 }, { cardId: 9 }, { cardId: 13 }],
      requeriments: {
        name: 'Test',
        element: { cardId: 22 },
      },
    };
    const newObj = {
      id: '12',
      cards: [{ id: 3 }, { id: 9 }, { id: 13 }],
      requeriments: {
        name: 'Test',
        element: { id: 22 },
      },
    };
    expect(searchCard(obj, callback)).toEqual(newObj);
  });
});
