import { Card } from '../../../Game/Entities/Card';

export type CardTranslate = {
  decode(item: { id: Card['id']; cardId: Card['cardId'] }): Card;
  transcode(card: Card): { id: Card['id']; cardId: Card['cardId'] };
};
