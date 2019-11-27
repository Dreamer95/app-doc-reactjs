import React, {Component, Fragment} from 'react';
import View from './containers/View/index';
import {withRouter} from 'react-router';

class Docs extends Component {
    render() {
        return (
            <Fragment>
                <View />
            </Fragment>
        );
    }
}

export default withRouter(Docs);
