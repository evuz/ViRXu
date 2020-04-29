import { offlineActionManager } from './offline.actionManager';
import { onlineActionManager } from './online.actionManager';

let adapter = onlineActionManager;

if (process.env.NODE_ENV !== 'production') {
  if (process.env.MODE === 'offline') {
    adapter = offlineActionManager;
  }
}

export const actionsManager = adapter;
