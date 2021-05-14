import FavoritesActionTypes from './favorites.types';

const initialState = {
	favorites: [
		{code: 215854, name: 'Tel Aviv, Tel Aviv, Israel'}
	]
}

const favoritesReducer = (state = initialState, action = {}) => {
    switch(action.type) {
        case FavoritesActionTypes.ADD_FAVORITE:
			//in case it already exists we don't add it. That's not going to happen anyway because the button is off, just in case.
			if (state.favorites.filter(e => e.code === action.payload.code).length > 0) {
				return {
    	            favorites: [...state.favorites]
        	    }
			}
			else {
				return {
					favorites: [...state.favorites, action.payload]
				}
			}
		case FavoritesActionTypes.REMOVE_FAVORITE:
			return {
                favorites: state.favorites.filter(
                    favorite => favorite.code !== action.payload
                )
			};
		default:
			return state;
    }
}

export default favoritesReducer;