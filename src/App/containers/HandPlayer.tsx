import React, { FC, useState, useEffect, useContext } from 'react';

import { Card as ICard } from '../../Game/Entities/Card';

import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { ManageSelectionContext, SelectionPlace } from '../context/ManageSelection/ManageSelectionContext';
import { filterClassNames } from '../../Utils/filterClassNames';
import { Requirement, RequirementApply } from '../../Game/Entities/Requirements';
import { getSelections } from '../../Utils/getSelections';
import { PlayerContext } from '../context/Player/PlayerContext';
import { CurrentPlayerContext } from '../context/CurrentPlayer/CurrentPlayerContext';

type HandPlayerProps = {};

export const HandPlayer: FC<HandPlayerProps> = () => {
  const player = useContext(PlayerContext);
  const currentPlayer = useContext(CurrentPlayerContext);
  const { selectionRequirements, setSelectionRequirements } = useContext(ManageSelectionContext);

  const [cards, setCards] = useState<ICard[]>([]);
  const [cardsSelected, setCardsSelected] = useState<Map<ICard, boolean>>(new Map());

  useEffect(() => {
    const subscription = player?.hand$.subscribe((c) => setCards(c));
    return () => subscription?.unsubscribe();
  }, [player]);

  useEffect(() => {
    setCardsSelected(new Map());
  }, [currentPlayer]);

  if (!player) {
    return null;
  }

  const isCurrentPlayer = currentPlayer?.id === player?.id;
  const numberCardsSelected = Array.from(cardsSelected.values()).filter((v) => !!v).length;
  const disableDiscard = !isCurrentPlayer || !numberCardsSelected;
  const disablePlay = !isCurrentPlayer || numberCardsSelected != 1;
  const isSelectable = selectionRequirements.place === SelectionPlace.Hand;
  const classNames = filterClassNames({
    HandPlayer: true,
    'HandPlayer--no-selectable': !isSelectable,
    'HandPlayer--current-player': isCurrentPlayer,
  });

  function selectCard(card) {
    if (!isSelectable) {
      return;
    }
    setCardsSelected((prev) => {
      const cardState = prev.get(card);
      prev.set(card, !cardState);
      return new Map(prev.entries());
    });
  }

  function discard() {
    if (disableDiscard) {
      return;
    }
    player.discard(getSelections(cardsSelected));
    setCardsSelected(new Map());
  }

  function play() {
    if (disablePlay) {
      return;
    }

    const selections = getSelections(cardsSelected);
    const card = selections[0];

    if (!card) {
      return;
    }

    const selectionRequirements =
      card.requirements?.filter((requirement: Requirement) => requirement.apply === RequirementApply.Selection) || [];

    if (selectionRequirements.length) {
      return setSelectionRequirements({ place: SelectionPlace.Board, card });
    }

    player.play(card);
  }

  return (
    <div className={classNames}>
      <div className="HandPlayer__name">{player.name}</div>
      <div className="HandPlayer__cards">
        {cards.map((card) => (
          <button onClick={() => selectCard(card)} key={card.id}>
            <Card card={card} selected={cardsSelected.get(card)} />
          </button>
        ))}
      </div>
      <div className="HandPlayer__buttons">
        <Button onClick={play} full disabled={disablePlay}>
          Play
        </Button>
        <Button onClick={discard} full disabled={disableDiscard}>
          Discard
        </Button>
      </div>
    </div>
  );
};
