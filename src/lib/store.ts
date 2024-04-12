import { configureStore } from '@reduxjs/toolkit'
import { gigSlice } from "./features/gig/gigSlice"
import { instrumentSlice } from "./features/instrument/instrumentSlice"
import { venueSlice } from "./features/venues/venueSlice"

export const makeStore = () => 
  configureStore({
    reducer: {
      gigForm: gigSlice.reducer,
      instruments: instrumentSlice.reducer,
      venues: venueSlice.reducer
      
    }
  })

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']