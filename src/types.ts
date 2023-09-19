export interface Card {
  id: number;
  no?: string | null;
  en?: string | null;
  uk?: string | null;
  emoji?: string | null;
  ordbokene?: string | null;
  naob?: string | null;
  snl?: string | null;
}

export interface User {
  displayName: string,
  greeting: boolean,
  isActive: boolean,
  lastActiveAt?: number,
  photoURL: string,
  role: string,
  room?: string,
  score: number,
  uid: string,
}

export interface Room {
  description: string,
  lang: string,
  leaderName?: string,
  leaderTimestamp?: number,
  leaderUid?: string,
  name: string,
  uid: string,
  winnerName?: string,
  winnerTimestamp?: number,
  winnerUid?: string,
  word?: string,
}

export interface RoomState {
  rooms: Room[],
  users: User[],
}

export enum GameState {
  NotStarted = "not_started",
  Explaining = "explaining",
  ChooseWinner = "choose_winner",
  YouExplaining = "you_explaining",
  WaitForWinner = "wait_for_winner",
  YouWin = "you_win"
}
