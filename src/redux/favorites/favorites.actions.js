import FavoritesActionTypes from './favorites.types';

export const addFavorite = item => ({
    type: FavoritesActionTypes.ADD_FAVORITE,
    payload: item
});

export const removeFavorite = item => ({
    type: FavoritesActionTypes.REMOVE_FAVORITE,
    payload: item
});