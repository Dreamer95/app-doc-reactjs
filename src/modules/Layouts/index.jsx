import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

//Assets
import Loading from 'Assets/images/loading.gif';
import 'Assets/css/bootstrap.min.css';
import 'Assets/css/style.less';
import './styles.less';

import fontawesome from '@fortawesome/fontawesome';
import {faCheckSquare, faCoffee} from '@fortawesome/fontawesome-free-solid';

fontawesome.library.add(faCheckSquare, faCoffee);

//Components
import DefaultHeader from 'Modules/Layouts/containers/DefaultHeader';
import DefaultMain from 'Modules/Layouts/containers/DefaultMain';
import DefaultFooter from 'Modules/Layouts/containers/DefaultFooter';
import Login from 'Modules/Layouts/containers/Login';
import Error from 'Modules/Layouts/containers/Error';

const defaultProps = {

};

class Layouts extends Component {
    state = {

    };

    render() {
        return (
            <React.Fragment>
                <DefaultHeader />
                <main>
                    {this.props.isAuthenticated ? (!this.props.isAccessDenied ? <DefaultMain /> : <Error />) : <Login />}
                </main>
                <DefaultFooter />
                {
                    this.props.loading ? (
                        <div id="loading">
                            <img src={Loading} alt="Loading" />
                            <span>Loading...</span>
                        </div>
                    ) : null
                }
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        loading: state.Layouts.layoutReducer.loading,
        isAuthenticated: state.Layouts.loginReducer.isAuthenticated,
        isAccessDenied: state.Layouts.errorReducer.isAccessDenied,
        isUserChecked: state.Layouts.loginReducer.isUserChecked,
        userId: state.Layouts.loginReducer.userId
    };
}

Layouts.defaultProps = defaultProps;

export default withRouter(connect(mapStateToProps)(Layouts));
