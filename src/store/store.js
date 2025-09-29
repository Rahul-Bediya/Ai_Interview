
import { configureStore } from "@reduxjs/toolkit";
import sessionReducer from "./sessionSlice";
import candidatesReducer from "./candidatesSlice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const sessionPersistConfig = {
  key: "session",
  storage,
  whitelist: ["currentCandidate", "currentQuestion", "answers"],
};

const candidatesPersistConfig = {
  key: "candidates",
  storage,
};

const persistedSessionReducer = persistReducer(sessionPersistConfig, sessionReducer);
const persistedCandidatesReducer = persistReducer(candidatesPersistConfig, candidatesReducer);

export const store = configureStore({
  reducer: {
    session: persistedSessionReducer,
    candidates: persistedCandidatesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
