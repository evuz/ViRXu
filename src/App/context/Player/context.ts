import { createContext } from 'react';
import { Player } from '../../../Game/Entities/Player';

export const PlayerContext = createContext<Player>(null);
