import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { User, Room } from '../../firebase'

export interface RoomState {
  rooms: Room[],
  users: User[],
}

const initialState: RoomState = {
  rooms: [],
  users: [],
}

export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setRooms: (state, action: PayloadAction<Room[]>) => {
      state.rooms = action.payload
    },
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setRooms, setUsers } = roomSlice.actions

export default roomSlice.reducer
