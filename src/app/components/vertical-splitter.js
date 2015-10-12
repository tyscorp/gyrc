import React, { Component } from 'react';
import Container from './container';
import EmptyContainer from './empty-container';

export default class VerticalSplitter extends Component {
    render() {
        const { reverse, split, uiElementId } = this.props;
        const left = (this.props.reverse ? this.props.right : this.props.left) || <EmptyContainer />;
        const right = (this.props.reverse ? this.props.left : this.props.right) || <EmptyContainer />;

        return (
            <div style={{
                display: 'flex',
                width: '100%',
                height: '100%',
                flexDirection: `row${reverse ? '-reverse' : ''}`
            }}>
                <Container
                    uiElementId={left.props.uiElementId}
                    uiElementParentId={uiElementId}
                    uiElementTarget={reverse ? 'right' : 'left'}
                    style={{ width: `calc(${split || '100%'} - 1px)` }}>
                    {left}
                </Container>
                <div style={{
                    width: '2px',
                    backgroundColor: 'black'
                }} />
                <Container
                    uiElementId={right.props.uiElementId}
                    uiElementParentId={uiElementId}
                    uiElementTarget={reverse ? 'left' : 'right'}
                    style={{ width: `calc(100% - ${split || '100%'} - 1px)` }}>
                    {right}
                </Container>
            </div>
        );
    }
}
