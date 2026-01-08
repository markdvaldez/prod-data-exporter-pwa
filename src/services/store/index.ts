import { configureStore } from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
} from "react-redux";
import { PersistedState, persistReducer, persistStore } from "redux-persist";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./rootReducer";
import { rootSaga } from "./rootSaga";
import storage from "./storage";

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

const persistConfig = {
  key: "root",
  storage: storage("runners-qc-app"),
  whitelist: ["auth", "history", "offlineQueue", "horseMedical"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

const setupStore = () =>
  configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => {
      const middlewares = getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false,
      });
      middlewares.push(sagaMiddleware);
      return middlewares;
    },
    devTools: true,
  });

const store = setupStore();

const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

const { dispatch } = store;

const useSelector: TypedUseSelectorHook<RootState> = useAppSelector;

const useDispatch = () => useAppDispatch<AppDispatch>();

export { dispatch, persistor, setupStore, store, useDispatch, useSelector };
