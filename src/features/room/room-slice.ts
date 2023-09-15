import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface RoomState {
  rooms: string[],
  users: string[],
}

const initialState: RoomState = {
  rooms: [],
  users: [],
}

export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setRooms: (state, action: PayloadAction<string[]>) => {
      state.rooms = action.payload
    },
    setUsers: (state, action: PayloadAction<string[]>) => {
      state.users = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setRooms, setUsers } = roomSlice.actions

export default roomSlice.reducer
