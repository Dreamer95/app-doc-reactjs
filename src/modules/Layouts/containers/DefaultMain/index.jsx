import React, {Component, Suspense} from 'react';
import {connect} from 'react-redux';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import classnames from 'classnames';

import DefaultSidebar from 'Modules/Layouts/containers/DefaultSidebar';

//Actions
import * as defaultMainActions from './actions';
import {updateRouteInfo} from 'Modules/Layouts/containers/DefaultMain/actions';

import routes from 'Src/routes';

const propTypes = {

};

class DefaultMain extends Component {
    componentDidMount() {

    }

    render() {
        return (
            <React.Fragment>
                <DefaultSidebar />
                <div className="content">
                    <div className="container-fluid">
                        <Suspense fallback={<div>Loading...</div>}>
                            <Switch>
                                {
                                    routes.map((route, idx) => {
                                        return route.component ? (
                                            <Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => (
                                                <route.component {...props} />
                                            )} />) : (null);
                                    })
                                }
                                <Redirect to={'/docs'} />
                            </Switch>
                        </Suspense>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

DefaultMain.propTypes = propTypes;

function mapStateToProps(state) {
    return {

    };
}

const mapDispatchToProps = {
    ...defaultMainActions,
    updateRouteInfo
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DefaultMain));
