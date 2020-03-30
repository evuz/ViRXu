import { Card } from '../../Entities/Card';

export const enum VirusCardType {
  Organ,
  Virus,
  Medicine,
  Treatment,
}

export const enum VirusCardColor {
  Multi,
  Red,
  Green,
  Blue,
  Yellow,
}

export type VirusCard = Card & {
  type: VirusCardType;
  color: VirusCardColor;
};
