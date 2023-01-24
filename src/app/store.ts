import thunkMiddleware from "redux-thunk";
import {configureStore} from "@reduxjs/toolkit";
import {rootReducer} from "./reducers";

//root store


export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleware)
})
// export type AppDispatchType = typeof store.dispatch
// @ts-ignore
window.store = store

if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () =>{
        store.replaceReducer(rootReducer)
    })
}


// export const store = createStore(rootReducer,applyMiddleware(thunkMiddleware))

//root types

//actions type

// | LoginActionsType
// | AuthActionsType
//state type

//reducer type

// export type AppDispatch = typeof store.dispatch
//dispatch type

// thunk type

// export type AppDispatch = any


