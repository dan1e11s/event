import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux/es/exports';

import { productsReducer } from './features/products/products-slice';
import { configsReducer } from './features/configs/configs-slice';
import { countryReducer } from './features/countries/country-slice';
import { controlsReducer } from './features/controls/controls-slice';
import { usersReducer } from './features/users/users-slice';
import { cartReducer } from './features/cart/carts-slice';
import { favouritesReducer } from './features/favourites/favourites-slice';
import { photosReducer } from './features/photos/photos-slice';

import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import persistStore from 'redux-persist/es/persistStore';

const persistConfig = {
  key: 'root',
  storage,
};

const storageReducers = combineReducers({
  cart: cartReducer,
  favourites: favouritesReducer,
});

const rootReducer = combineReducers({
  storage: persistReducer(persistConfig, storageReducers),
  products: productsReducer,
  configs: configsReducer,
  countries: countryReducer,
  controls: controlsReducer,
  users: usersReducer,
  photos: photosReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
