import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { User, Room } from '../../firebase'

export enum GameState {
  NotStarted = "not_started",
  Explaining = "explaining",
  ChooseWinner = "choose_winner",
  YouExplaining = "you_explaining",
  WaitForWinner = "wait_for_winner",
  YouWin = "you_win"
}

export interface RoomState {
  room: Room | null,	
  players: User[],
  state: GameState | null,
}

const initialState: RoomState = {
  room: null,
  players: [],
  state: null,
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setRoom: (state, action: PayloadAction<Room | null>) => {
      state.room = action.payload
    },
    setPlayers: (state, action: PayloadAction<User[]>) => {
      state.players = action.payload
    },
    setState: (state, action: PayloadAction<GameState | null>) => {
      state.state = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setRoom, setPlayers, setState } = gameSlice.actions

export default gameSlice.reducer
