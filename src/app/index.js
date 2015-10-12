import IRC from './irc/index';
import LogMonitor from 'redux-devtools-log-monitor';
import React from 'react';
import { render } from 'react-dom';
import Root from './root';
import { configureStore } from './store';
import { List } from 'immutable';
import { Provider } from 'react-redux';

const rootElement = document.getElementById('react-root');

const store = window.store = configureStore();
IRC(store);

store.dispatch({
    type: 'ADD_NETWORK',
    payload: {
        host: 'thoth.irc.tyscorp.net',
        port: 6667,
        ssl: false,
        name: 'TYSCORP-IRC',
        enabled: true,
        connected: false,
        channels: [{
            name: '#gysucks'
        },
        {
            name: '#SecretBase'
        }]
    }
});

store.dispatch({
    type: 'ADD_CHANNEL',
    payload: {
        network: {
            host: 'thoth.irc.tyscorp.net'
        },
        channel: {
            name: '#gysucks'
        }
    }
});

render(
    <Provider store={store} key="provider">
        <Root />
    </Provider>,
    rootElement
);
