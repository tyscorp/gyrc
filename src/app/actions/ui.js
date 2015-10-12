export const ADD_UI_ELEMENT = 'ADD_UI_ELEMENT';
export const REMOVE_UI_ELEMENT = 'REMOVE_UI_ELEMENT';
export const SWAP_UI_ELEMENTS = 'SWAP_UI_ELEMENTS';

export function removeUIElement(id) {
    return {
        type: REMOVE_UI_ELEMENT,
        payload: id
    };
};
export function createUIElement(data) {
    return {
        type: ADD_UI_ELEMENT,
        payload: data
    };
};
