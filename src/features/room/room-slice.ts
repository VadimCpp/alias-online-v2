import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface RoomState {
  rooms: string[],
}

const initialState: RoomState = {
  rooms: [],
}

export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setRooms: (state, action: PayloadAction<string[]>) => {
      state.rooms = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setRooms } = roomSlice.actions

export default roomSlice.reducer
