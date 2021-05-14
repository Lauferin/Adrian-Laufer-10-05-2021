import { CHANGE_MEASURE, CHANGE_THEME, CHANGE_TOGGLE } from './options.types';

export const setMeasure = (text) => {
    return ({
        type: CHANGE_MEASURE,
        payload: text
    })
};

export const setTheme = (text) => {
    return ({
        type: CHANGE_THEME,
        payload: text
    })
};

export const setToggle = (text) => {
    return ({
        type: CHANGE_TOGGLE,
        payload: text
    })
};