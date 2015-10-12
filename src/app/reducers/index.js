import { combineReducers } from 'redux';
import { networks } from './networks';
import { ui } from './ui';

const rootReducer = combineReducers({
    networks,
    ui
});

export default rootReducer;
