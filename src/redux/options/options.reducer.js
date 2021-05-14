import { CHANGE_MEASURE, CHANGE_THEME, CHANGE_TOGGLE } from './options.types';

const initialState = {
	measure: 'F',
	theme: 'bright',
	toggle: '/location'
}

const measureReducer = (state = initialState, action = {}) => {
	switch(action.type) {
		case CHANGE_MEASURE:
			return Object.assign({}, state, {measure: action.payload});
		case CHANGE_THEME:
			return Object.assign({}, state, {theme: action.payload});
		case CHANGE_TOGGLE:
			return Object.assign({}, state, {toggle: action.payload});
		default:
			return state;
	}
}

export default measureReducer;