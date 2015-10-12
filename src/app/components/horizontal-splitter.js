import React, { Component } from 'react';
import Container from './container';
import EmptyContainer from './empty-container';

export default class HorizontalSplitter extends Component {
    render() {
        const { reverse, split, uiElementId } = this.props;
        const top = (reverse ? this.props.bottom : this.props.top) || <EmptyContainer />;
        const bottom = (reverse ? this.props.top : this.props.bottom) || <EmptyContainer />;

        return (
            <div style={{
                display: 'flex',
                width: '100%',
                height: '100%',
                flexDirection: `column${reverse ? '-reverse' : ''}`
            }}>
                <Container
                    uiElementId={top.props.uiElementId || null}
                    uiElementParentId={uiElementId}
                    uiElementTarget={reverse ? 'bottom' : 'top'}
                    style={{ height: `calc(${split || '100%' } - 1px)` }}>
                    {top}
                </Container>
                <div style={{
                    height: '2px',
                    backgroundColor: 'black'
                }} />
                <Container
                    uiElementId={bottom.props.uiElementId  || null}
                    uiElementParentId={uiElementId}
                    uiElementTarget={reverse ? 'top' : 'bottom'}
                    style={{ height: `calc(100% - ${split || '100%'} - 1px)` }}>
                    {bottom}
                </Container>
            </div>
        );
    }
}
