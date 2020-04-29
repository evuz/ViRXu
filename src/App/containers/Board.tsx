import React, { useState, FC, useEffect, useContext } from 'react';
import { Subscription } from 'rxjs';

import { BoardPlayer } from '../components/BoardPlayer';
import { CurrentPlayerContext } from '../context/CurrentPlayer/CurrentPlayerContext';
import { GameContext } from '../context/Game/GameContext';
import { ManageSelectionContext, SelectionPlace } from '../context/ManageSelection/ManageSelectionContext';
import { Card } from '../../Game/Entities/Card';
import { Requirement, RequirementApply } from '../../Game/Entities/Requirements';
import { getSelections } from '../../Utils/getSelections';
import { Board as IBoard } from '../../Game/Entities/Board';
import { PlayerContext } from '../context/Player/PlayerContext';
import { IPlayer } from '../../Game/Entities/Player';
import { domain } from '../../Services/domain';
import { filter } from 'rxjs/operators';
import { ActionsPayloadType } from '../../Game/Enums/ActionsPayloadType';
import { ActionPayloadNewPlayer } from '../../Game/Entities/ActionPayload';

type BoardProps = {};

export const Board: FC<BoardProps> = () => {
  const { game } = useContext(GameContext);
  const { selectionRequirements } = useContext(ManageSelectionContext);
  const currentPlayer = useContext(CurrentPlayerContext);
  const player = useContext(PlayerContext);

  const [cardsSelected, setCardsSelected] = useState<Map<Card, boolean>>(new Map());
  const [board, setBoard] = useState<IBoard>(new Map());
  const [players, setPlayers] = useState<IPlayer[]>([]);

  const boardSelectable = selectionRequirements.place === SelectionPlace.Board;

  useEffect(() => {
    const subscription: Subscription = domain
      .adapter('actionsManager')
      .actions$.pipe(filter(({ payload }) => payload.action === ActionsPayloadType.NewPlayer))
      .subscribe((action) => {
        const payload = action.payload as ActionPayloadNewPlayer;
        setPlayers((p) => p.concat(payload.player));
      });
    return () => subscription?.unsubscribe();
  }, []);

  useEffect(() => {
    const subscription: Subscription = game?.board$.subscribe((b) => {
      setBoard(new Map(b.entries()));
    });
    return () => subscription?.unsubscribe();
  }, [game]);

  useEffect(() => {
    setCardsSelected(new Map());
  }, [currentPlayer, boardSelectable]);

  useEffect(() => {
    if (!boardSelectable || currentPlayer.id !== player.id) {
      return;
    }
    const selections = getSelections(cardsSelected);
    const requirements = selectionRequirements.card.requirements?.filter(
      (requirement: Requirement) => requirement.apply === RequirementApply.Selection,
    );

    if (selections.length === requirements.length) {
      player.play(selectionRequirements.card, getSelections(cardsSelected));
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
          key={player.id}
          board={board.get(player.id)}
          active={currentPlayer?.id === player.id}
          player={player}
        />
      ))}
    </div>
  );
};
