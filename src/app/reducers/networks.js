import Immutable, { List } from 'immutable';

import { ADD_NETWORK, ADD_CHANNEL } from '../actions/networks';

export function networks(state = List(), { type, payload }) {
    switch (type) {
        case ADD_NETWORK:
            return state.push(payload);

        case ADD_CHANNEL:
            // return state.find()
    }

    return state;
}
