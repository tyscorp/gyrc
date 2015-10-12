import _ from 'lodash';
import React, { Component } from 'react';

export default class NetworkList extends Component {
    render() {
        const channels = this.props.network.channels;

        return (
            <ul>
                {_.map(channels, (channel, i) => <li key={i}>{channel.name}</li>)}
            </ul>
        );
    }
}
