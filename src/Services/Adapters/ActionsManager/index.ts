import { offlineActionManager } from './offline.actionManager';
import { onlineActionManager } from './online.actionManager';
import { ActionsManagerAdapter } from './actionsManager.adapter';

type ActionManagerFactory = (services?: Object) => ActionsManagerAdapter;

let adapter: ActionManagerFactory = onlineActionManager;

if (process.env.NODE_ENV !== 'production') {
  if (process.env.MODE === 'offline') {
    adapter = offlineActionManager;
  }
}

export const actionsManager = adapter;
