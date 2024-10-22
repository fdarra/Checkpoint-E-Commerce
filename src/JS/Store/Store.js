import { createStore, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
import RootReducer from "../Reducers";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Utilisation du localStorage
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['Cart_wishesListReducer', 'AuthReducer','ProductReducer'], // Les reducers que vous souhaitez persister
};
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistedReducer = persistReducer(persistConfig, RootReducer);


const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const persistor = persistStore(store);

export  {store, persistor};
