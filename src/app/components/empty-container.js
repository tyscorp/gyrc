import React, { Component } from 'react';

export default class EmptyContainer extends Component {
    render() {
        const style = { width: '100%', height: 'calc(100% - 16px)', border: '1px dashed black', margin: '8px', backgroundColor: 'white' };
        return <div style={style} />;
    }
}
