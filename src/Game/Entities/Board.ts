import { OrganCard } from './OrganCard';
import { Player } from './Player';

export type Board = Map<ReturnType<Player['getId']>, OrganCard[]>;
