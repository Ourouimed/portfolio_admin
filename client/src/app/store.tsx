import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./features/auth/authSlice"
import toastReducer  from "./features/toast/toastSlice"
import projectReducer  from "./features/project/projectSlice"

import journeyReducer  from "./features/journey/journeySlice"

export const store = configureStore({
    
    reducer : {
        auth : authReducer ,
        toast : toastReducer ,
        project : projectReducer ,
        journey : journeyReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;