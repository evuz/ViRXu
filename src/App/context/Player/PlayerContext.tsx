import { PlayerContext as context } from './context';
import { PlayerState as online } from './PlayerContext.online';
import { PlayerState as offline } from './PlayerContext.offline';

export const PlayerContext = context;
let state = online;

if (process.env.NODE_ENV !== 'production') {
  if (process.env.MODE === 'offline') {
    state = offline;
  }
}

export const PlayerState = state;
