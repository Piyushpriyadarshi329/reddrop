import {configureStore} from '@reduxjs/toolkit';
import Appstate from './reducer/Authreducer';
import customerdata from './reducer/Customerreducer';

export const store = configureStore({
  reducer: {
    Appstate: Appstate,
    customerdata: customerdata,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
