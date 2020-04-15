import React, { FC } from 'react';

import { OrganCard as IOrganCard } from '../../Game/Entities/OrganCard';
import { Card } from './Card';

type CardPlayedProps = {
  card: IOrganCard;
};

export const OrganCard: FC<CardPlayedProps> = ({ card: cardPlayed }) => {
  const organ = cardPlayed.organ;
  return <Card card={organ} />;
};
