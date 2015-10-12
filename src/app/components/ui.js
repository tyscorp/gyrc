import _ from 'lodash';
import Import from '../components/import';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

@connect(
    createSelector(
        (state) => state.ui,
        (ui) => { return { ui }; }
    )
)
export default class UI extends Component {
    render() {
        return findAndCreateElement(this.props.ui, { parent: 'root' });
    }
}

function findAndCreateElement(ui, selector) {
    return createElement(ui, _.find(ui, selector));
}

function findAndCreateElements(ui, selector) {
    return createElements(ui, _.filter(ui, selector));
}

function createElements(ui, uiElements) {
    return _.map(uiElements, (uiElement, i) => createElement(ui, uiElement, i));
}

function createElement(ui, uiElement, i = 0) {
    const isImport = !!uiElement.import;

    const element = isImport ? Import : uiElement.element;
    const children = _.indexBy(_.filter(ui, (e) => e.parent === uiElement.id && e.target !== 'children'), 'target');

    const props = _.merge(
        { component: uiElement.import, key: i, uiElementId: uiElement.id },
        uiElement.props,
        _.mapValues(children, (e) => findAndCreateElement(ui, { id: e.id }))
    );

    return React.createElement(
        element,
        props,
        findAndCreateElements(ui, { parent: uiElement.id, target: 'children' })
    );
}
