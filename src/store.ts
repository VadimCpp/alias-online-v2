import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './features/counter/counter-slice'
import userReducer from './features/user/user-slice'
import roomReducer from './features/room/room-slice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    room: roomReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
