import _ from 'lodash';
import Immutable, { List } from 'immutable';

import { ADD_UI_ELEMENT, REMOVE_UI_ELEMENT, SWAP_UI_ELEMENTS } from '../actions/ui';

// const defaultUI = [{
//     id: 0,
//     parent: 'root',
//     element: 'div',
//     props: {
//         style: { width: '100%', height: '100%', position: 'absolute' }
//     }
// },
// {
//     id: 1,
//     parent: 0,
//     target: 'children',
//     import: 'Container'
// },
// {
//     id: 2,
//     parent: 1,
//     target: 'children',
//     import: 'VerticalSplitter',
//     props: { split: '200px' }
// },
// {
//     id: 3,
//     parent: 2,
//     target: 'left',
//     import: 'NetworkList'
// },
// {
//     id: 4,
//     parent: 2,
//     target: 'right',
//     import: 'VerticalSplitter',
//     props: { split: '200px', reverse: true }
// },
// {
//     id: 5,
//     parent: 4,
//     target: 'left',
//     import: 'HorizontalSplitter',
//     props: { split: '30px', reverse: true }
// },
// {
//     id: 6,
//     parent: 4,
//     target: 'right',
//     element: 'div'
// },
// {
//     id: 7,
//     parent: 5,
//     target: 'top',
//     element: 'div'
// },
// {
//     id: 8,
//     parent: 5,
//     target: 'bottom',
//     import: 'MessageBox'
// }];

const defaultUI = [{
    id: 0,
    parent: 'root',
    element: 'div',
    props: {
        style: { width: '100%', height: '100%', position: 'absolute' }
    }
},
{
    id: 1,
    parent: 0,
    target: 'children',
    import: 'Container'
},
{
    id: 2,
    parent: 1,
    target: 'children',
    import: 'VerticalSplitter',
    props: { split: '50%' }
}];

let lastId = _.max(_.pluck(defaultUI, 'id')) + 1;

export function ui(state = defaultUI, { type, payload }) {
    switch (type) {
        case REMOVE_UI_ELEMENT:
            const ids = _.compact(_.flattenDeep(getIdTree(state, payload)));

            return _.filter(state, (e) => !~ids.indexOf(e.id));

        case ADD_UI_ELEMENT:
            return state.concat(_.merge({ id: lastId++ }, payload));
    }

    return state;
}

function getIdTree(ui, id) {
    const c = _.pluck(_.find(ui, { parent: id }), 'id');

    if (c.length === 0) return [id];

    return [id, _.map(c, (cid) => getIdTree(ui, cid))];
}
