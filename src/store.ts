import buttonClickReducer from "./reducers";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector as rawUseSelector } from "react-redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware()

const middleware = [...getDefaultMiddleware(), sagaMiddleware]
// const middleware = (getDefaultMiddleware: (arg0: { serializableCheck: boolean; }) => any) =>
//     getDefaultMiddleware({
//         serializableCheck: false
//     })

const store = configureStore({
    reducer: buttonClickReducer,
    middleware
})

sagaMiddleware.run(rootSaga)

export default store
export type RootState = ReturnType<typeof store.getState>
export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector