import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { User, Room } from '../../firebase'

export interface RoomState {
  room: Room | null,	
  players: User[],
}

const initialState: RoomState = {
  room: null,
  players: [],
}

export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setRoom: (state, action: PayloadAction<Room | null>) => {
      state.room = action.payload
    },
    setPlayers: (state, action: PayloadAction<User[]>) => {
      state.players = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setRoom, setPlayers } = roomSlice.actions

export default roomSlice.reducer
