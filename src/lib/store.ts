import { configureStore } from '@reduxjs/toolkit'
import { gigSlice } from "./features/gig/gigSlice"

export const makeStore = () => 
  configureStore({
    reducer: {
      gigForm: gigSlice.reducer,
      
    }
  })

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']