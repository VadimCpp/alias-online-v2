import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
  displayName: string,
  photoURL: string,
  isLogged: boolean,
}

const initialState: UserState = {
  displayName: "",
  photoURL: "",
  isLogged: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.displayName = action.payload
    },
    setStatus: (state, action: PayloadAction<boolean>) => {
      state.isLogged = action.payload
    },
    setPhotoURL: (state, action: PayloadAction<string>) => {
      state.photoURL = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setName, setStatus, setPhotoURL } = userSlice.actions

export default userSlice.reducer
