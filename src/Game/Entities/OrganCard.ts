import { Card } from './Card';
import { OrganCardState } from '../Enums/OrganCardState';
import { VirusCardType } from '../Enums/VirusCardType';

export type IOrganCard = Card & {
  type: VirusCardType.Organ;
};

export type OrganCard = {
  state: OrganCardState;
  organ: IOrganCard;
  cards: Card[];
};

export const OrganCard = {
  calculateState(cards: Card[]) {
    const medicines = cards.filter((card) => card.type === VirusCardType.Medicine).length;
    const virus = cards.filter((card) => card.type === VirusCardType.Virus).length;
    switch (medicines) {
      case 2:
        return OrganCardState.Immnunise;
      case 1:
        return OrganCardState.Vaccinate;
    }
    switch (virus) {
      case 2:
        return OrganCardState.Extirpate;
      case 1:
        return OrganCardState.Infect;
    }
    return OrganCardState.Free;
  },
};
