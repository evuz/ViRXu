import React, { useState, FC, useEffect, useContext } from 'react';
import { Subscription } from 'rxjs';

import { playerGenerator, Player } from '../../Game/Entities/Player';

import { BoardPlayer } from '../components/BoardPlayer';
import { CurrentPlayerContext } from '../context/CurrentPlayer/CurrentPlayerContext';
import { GameContext } from '../context/Game/GameContext';
import { ManageSelectionContext, SelectionPlace } from '../context/ManageSelection/ManageSelectionContext';
import { Card } from '../../Game/Entities/Card';
import { Requirement, RequirementApply } from '../../Game/Entities/Requirements';
import { getSelections } from '../../Utils/getSelections';
import { Board as IBoard } from '../../Game/Entities/Board';

type BoardProps = {
  onPlayerReady(player: Player): void;
};

let _players: Player[];
function playersGen() {
  if (!_players) {
    _players = [
      playerGenerator({ id: '1', name: 'Player 1' }),
      playerGenerator({ id: '2', name: 'Player 2' }),
      playerGenerator({ id: '3', name: 'Player 3' }),
      playerGenerator({ id: '4', name: 'Player 4' }),
    ];
  }
  return _players;
}

export const Board: FC<BoardProps> = ({ onPlayerReady }) => {
  const { game } = useContext(GameContext);
  const currentPlayer = useContext(CurrentPlayerContext);
  const { selectionRequirements } = useContext(ManageSelectionContext);

  const [cardsSelected, setCardsSelected] = useState<Map<Card, boolean>>(new Map());
  const [board, setBoard] = useState<IBoard>(new Map());
  const [players] = useState(playersGen);

  const boardSelectable = selectionRequirements.place === SelectionPlace.Board;

  useEffect(() => {
    const subscriptions: Subscription[] = players.map((player) => player.ready$.subscribe(() => onPlayerReady(player)));
    () => subscriptions.forEach((subscription) => subscription.unsubscribe());
  }, [onPlayerReady, players]);

  useEffect(() => {
    const subscription: Subscription = game?.board$.subscribe((b) => {
      setBoard(new Map(b.entries()));
    });
    () => subscription?.unsubscribe();
  }, [game]);

  useEffect(() => {
    setCardsSelected(new Map());
  }, [currentPlayer, boardSelectable]);

  useEffect(() => {
    if (!boardSelectable) {
      return;
    }
    const selections = getSelections(cardsSelected);
    const requirements = selectionRequirements.card.requirements?.filter(
      (requirement: Requirement) => requirement.apply === RequirementApply.Selection,
    );

    if (selections.length === requirements.length) {
      currentPlayer.play(selectionRequirements.card, getSelections(cardsSelected));
    }
  }, [boardSelectable, cardsSelected, selectionRequirements.card]); // eslint-disable-line

  function selectCard(card) {
    if (!boardSelectable) {
      return;
    }

    setCardsSelected((prev) => {
      const cardState = prev.get(card);
      prev.set(card, !cardState);
      return new Map(prev.entries());
    });
  }

  return (
    <div className="Board">
      {players.map((player) => (
        <BoardPlayer
          onSelectCard={selectCard}
          selectable={boardSelectable}
          key={player.getId()}
          board={board.get(player)}
          active={currentPlayer?.getId() === player.getId()}
          player={player}
        />
      ))}
    </div>
  );
};
