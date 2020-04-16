import React, { FC, useState, useEffect, useContext } from 'react';

import { Card as ICard } from '../../Game/Entities/Card';

import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { CurrentPlayerContext } from '../context/CurrentPlayer/CurrentPlayerContext';
import { ManageSelectionContext, SelectionPlace } from '../context/ManageSelection/ManageSelectionContext';
import { filterClassNames } from '../../Utils/filterClassNames';
import { Requirement, RequirementApply } from '../../Game/Entities/Requirements';
import { getSelections } from '../../Utils/getSelections';

type HandPlayerProps = {};

export const HandPlayer: FC<HandPlayerProps> = () => {
  const player = useContext(CurrentPlayerContext);
  const { selectionRequirements, setSelectionRequirements } = useContext(ManageSelectionContext);

  const [cards, setCards] = useState<ICard[]>([]);
  const [cardsSelected, setCardsSelected] = useState<Map<ICard, boolean>>(new Map());

  useEffect(() => {
    const subscription = player?.hand$.subscribe((c) => setCards(c));
    () => subscription?.unsubscribe();
  }, [player]);

  if (!player) {
    return null;
  }

  const numberCardsSelected = Array.from(cardsSelected.values()).filter((v) => !!v).length;
  const disableDiscard = !numberCardsSelected;
  const disablePlay = numberCardsSelected != 1;
  const isSelectable = selectionRequirements.place === SelectionPlace.Hand;
  const classNames = filterClassNames({
    HandPlayer: true,
    'HandPlayer--no-selectable': !isSelectable,
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
    setCardsSelected(new Map());
  }

  return (
    <div className={classNames}>
      <div className="HandPlayer__name">{player.getName()}</div>
      <div className="HandPlayer__cards">
        {cards.map((card, index) => (
          <button onClick={() => selectCard(card)} key={`${index}-${card.id}`}>
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
