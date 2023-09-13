import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
  name: string,
  isLogged: boolean,
}

const initialState: UserState = {
  name: "",
  isLogged: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    },
    setStatus: (state, action: PayloadAction<boolean>) => {
      state.isLogged = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setName, setStatus } = userSlice.actions

export default userSlice.reducer
