import React, { FC } from 'react';

import { OrganCard as IOrganCard } from '../../Game/Entities/OrganCard';
import { Card } from './Card';

type CardPlayedProps = {
  card: IOrganCard;
  selectable?: boolean;
  onClick?: Function;
};

export const OrganCard: FC<CardPlayedProps> = ({ card: cardPlayed, selectable = false, onClick = () => {} }) => {
  const organ = cardPlayed.organ;
  return (
    <button onClick={() => onClick(cardPlayed)} disabled={!selectable}>
      <Card selectable={selectable} card={organ} />
    </button>
  );
};
