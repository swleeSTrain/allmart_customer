import {configureStore} from "@reduxjs/toolkit";
import pointReducer from "./slices/pointSlice.ts";
import {signupReducer} from "./slices/signupSlice.ts"



const projectStore = configureStore({
    reducer: {
        points: pointReducer,
        signup: signupReducer,
    }

});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof projectStore.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof projectStore.dispatch;

export default projectStore