import React, { FC } from 'react';
import { CardPlayed as ICardPlayed } from '../../Game/Entities/CardPlayed';
import { VirusCardType } from '../../Game/Enums/VirusCardType';
import { Card } from './Card';

type CardPlayedProps = {
  card: ICardPlayed;
};

export const CardPlayed: FC<CardPlayedProps> = ({ card: cardPlayed }) => {
  const organ = cardPlayed.cards.find((card) => card.type === VirusCardType.Organ);
  return <Card card={organ} />;
};
