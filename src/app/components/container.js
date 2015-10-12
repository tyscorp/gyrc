import React, { Component } from 'react';
import remote from 'remote';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { findDOMNode } from 'react-dom';
import { removeUIElement, createUIElement } from '../actions/ui';
import EmptyContainer from './empty-container';

const Menu = remote.require('menu');
const MenuItem = remote.require('menu-item');

const isEditingMode = true;

@connect(
    createSelector(
        (state) => state.ui,
        (ui) => { return { ui }; }
    )
)
export default class Container extends Component {
    constructor() {
        super();

        this.handleContextMenu = this._handleContextMenu.bind(this);
    }

    componentDidMount() {
        findDOMNode(this).addEventListener('contextmenu', this.handleContextMenu);
    }

    componentWillUnmount() {
        findDOMNode(this).removeEventListener('contextmenu', this.handleContextMenu);
    }

    render() {
        return (
            <div className="container" {...this.props}>
                {this.props.children || <EmptyContainer />}
            </div>
        );
    }

    _handleContextMenu(e) {
        if (!isEditingMode) return;

        const { dispatch, uiElementId, uiElementParentId, uiElementTarget } = this.props;

        e.preventDefault();
        e.stopPropagation();

        function createUIElementImport(i, p) {
            return createUIElement({
                parent: uiElementParentId || uiElementId,
                target: uiElementTarget || 'children',
                import: i,
                props: p
            });
        };

        if (uiElementId) {
            const menu = [{
                label: 'Remove UI Element',
                click() { dispatch(removeUIElement(uiElementId)) }
            }];

            Menu.buildFromTemplate(menu).popup(remote.getCurrentWindow());
        }
        else {
            const menu = [{
                label: 'Add UI Element',
                submenu: [{
                    label: 'Vertical Splitter',
                    click() { dispatch(createUIElementImport('VerticalSplitter', { split: '50%' })) }
                },
                {
                    label: 'Horizontal Splitter',
                    click() { dispatch(createUIElementImport('HorizontalSplitter', { split: '50%' })) }
                },
                {
                    label: 'Network List',
                    click() { dispatch(createUIElementImport('NetworkList')) }
                }]
            }];

            Menu.buildFromTemplate(menu).popup(remote.getCurrentWindow());
        }
    }
}
