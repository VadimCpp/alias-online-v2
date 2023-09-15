import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { User, Room } from '../../firebase'

export interface RoomState {
  room: Room | null,	
  users: User[],
}

const initialState: RoomState = {
  room: null,
  users: [],
}

export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setRoom: (state, action: PayloadAction<Room | null>) => {
      state.room = action.payload
    },
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setRoom, setUsers } = roomSlice.actions

export default roomSlice.reducer
