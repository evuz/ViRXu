import React, { FC, useState, useEffect } from 'react';

import { OrganCard as IOrganCard } from '../../Game/Entities/OrganCard';
import { Card } from './Card';
import { OrganCardState } from '../../Game/Enums/OrganCardState';

type CardPlayedProps = {
  card: IOrganCard;
  selectable?: boolean;
  onClick?: Function;
};

const enum StateSize {
  L = 'l',
  M = 'm',
  S = 's',
}

function iconStateSize(height: number) {
  console.log(height);
  if (height > 260) {
    return StateSize.L;
  } else if (height > 180) {
    return StateSize.M;
  }

  return StateSize.S;
}

export const OrganCard: FC<CardPlayedProps> = ({ card: cardPlayed, selectable = true, onClick = () => {} }) => {
  const [dimensions, setDimensions] = useState<DOMRect>(null);
  const [stateSize, setStateSize] = useState(StateSize.S);
  const organ = cardPlayed.organ;

  useEffect(() => {
    if (!dimensions) {
      return;
    }
    setStateSize(iconStateSize(dimensions.height));
  }, [dimensions]);

  return (
    <button className="OrganCard" onClick={() => onClick(cardPlayed.organ)} disabled={!selectable}>
      <Card onSize={setDimensions} selectable={selectable} card={organ}>
        <div className={`OrganCard__states OrganCard__states--${stateSize}`}>
          {cardPlayed.state === OrganCardState.Immnunise ? (
            <i className={`icon icon-immunise`}></i>
          ) : (
            cardPlayed.cards?.map((card, index) => <i key={index} className={`icon icon-${card.type}`}></i>)
          )}
        </div>
      </Card>
    </button>
  );
};
