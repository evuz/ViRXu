export const enum RoomState {
  Open,
  Closed,
}

export type Room = {
  id: string;
  name: string;
  state: RoomState;
};
