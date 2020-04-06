import { Card } from './Card';
import { CardPlayedState } from '../Enums/CardPlayedState';
import { VirusCardType } from '../Enums/VirusCardType';

export type CardPlayed = {
  state: CardPlayedState;
  cards: Card[];
};

export const CardPlayed = {
  calculateState(cards: Card[]) {
    const medicines = cards.filter((card) => card.type === VirusCardType.Medicine).length;
    const virus = cards.filter((card) => card.type === VirusCardType.Virus).length;
    switch (medicines) {
      case 2:
        return CardPlayedState.Immnunise;
      case 1:
        return CardPlayedState.Vaccinate;
    }
    switch (virus) {
      case 2:
        return CardPlayedState.Extirpate;
      case 1:
        return CardPlayedState.Infect;
    }
    return CardPlayedState.Free;
  },
};
