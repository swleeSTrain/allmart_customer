import {configureStore} from "@reduxjs/toolkit";


const projectStore = configureStore({
    reducer: {

    }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof projectStore.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof projectStore.dispatch

export default projectStore