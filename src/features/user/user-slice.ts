import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
  displayName: string | null,
  photoURL: string | null,
  isLogged: boolean,
  uid: string | null,
}

const initialState: UserState = {
  displayName: null,
  photoURL: null,
  isLogged: false,
  uid: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string | null>) => {
      state.displayName = action.payload
    },
    setStatus: (state, action: PayloadAction<boolean>) => {
      state.isLogged = action.payload
    },
    setPhotoURL: (state, action: PayloadAction<string | null>) => {
      state.photoURL = action.payload
    },
    setUid: (state, action: PayloadAction<string | null>) => {
      state.uid = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setName, setStatus, setPhotoURL, setUid } = userSlice.actions

export default userSlice.reducer
