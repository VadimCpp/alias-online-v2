import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import * as Types from '../../types'

export interface RoomState {
  room: Types.Room | null,	
  players: Types.User[],
  state: Types.GameState | null,
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
    setRoom: (state, action: PayloadAction<Types.Room | null>) => {
      state.room = action.payload
    },
    setPlayers: (state, action: PayloadAction<Types.User[]>) => {
      state.players = action.payload
    },
    setState: (state, action: PayloadAction<Types.GameState | null>) => {
      state.state = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setRoom, setPlayers, setState } = gameSlice.actions

export default gameSlice.reducer
