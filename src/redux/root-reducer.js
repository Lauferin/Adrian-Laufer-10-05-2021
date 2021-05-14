import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import favoritesReducer from './favorites/favorites.reducer';
import optionsReducer from './options/options.reducer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['favorites']
}

const rootReducer = combineReducers({
    favorites: favoritesReducer,
    options: optionsReducer
})

export default persistReducer(persistConfig, rootReducer);