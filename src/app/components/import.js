import Container from './container';
import _ from 'lodash';
import React, { Component } from 'react';

export default class Import extends Component {
    constructor(props) {
        super();

        this.state = { component: requireComponent(_.kebabCase(props.component)) };
    }

    render() {
        return this.state.component ? React.createFactory(this.state.component)(this.props) : null;
    }
}

function requireComponent(component) {
    const paths = [
        `../../../plugins/${component}/index`,
        component,
        `./${component}`,
        `./${component}/index`
    ];

    return requirePaths(paths);
}


function requirePaths(paths) {
    if (paths.length === 0) return null;

    try {
        return require(paths[0])
    }
    catch (e) {
        return requirePaths(paths.slice(1));
    }
}
