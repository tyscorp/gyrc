import React from 'react';
import promise from 'redux-promise';
import rootReducer from './reducers/index';
import { compose, createStore, applyMiddleware } from 'redux';
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';


const createStoreWithAddons = compose(
    applyMiddleware(promise),
    createDevTools(
        <DockMonitor toggleVisibilityKey='H' changePositionKey='Q'>
            <LogMonitor theme='ocean' />
        </DockMonitor>
    ).instrument()
)(createStore);

export function configureStore(initialState) {
    return createStoreWithAddons(rootReducer, initialState);
}
