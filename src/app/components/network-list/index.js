import _ from 'lodash';
import ChannelList from './channel-list';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

@connect(createSelector(
    (state) => state.networks.toArray(),
    (networks) => { return { networks }; }
))
export default class NetworkList extends Component {
    render() {
        console.log(this.props);
        const { networks } = this.props;

        return (
            <div className="component component-network-list">
                <ul>
                    {_.map(networks, (network, i) =>
                        <li key={i}>
                            <span>{network.name}</span>
                            <ChannelList network={network} />
                        </li>
                    )}
                </ul>
            </div>
        );
    }
}
