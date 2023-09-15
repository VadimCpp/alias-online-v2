import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/user/user-slice'
import roomReducer from './features/room/room-slice'
import firestoreDataReducer from './features/firestore-data/firestore-data-slice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    room: roomReducer,
    firestore: firestoreDataReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
