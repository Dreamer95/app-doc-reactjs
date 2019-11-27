// Libraries
import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Route, withRouter, Link} from 'react-router-dom';

// Assets
import Logo from 'Assets/images/logo-antsadx.png';
import EnglishLang from 'Assets/images/img-english.png';

//Actions
import {showLoading, hideLoading} from 'Modules/Layouts/actions';
import {updateMenu} from 'Modules/Layouts/containers/DefaultHeader/actions';

const propTypes = {
    children: PropTypes.node
};

const defaultProps = {

};

class DefaultHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    pushHistory = () => {
        const {pathname} = this.props.history.location;

        this.props.history.push(pathname);
    };

    render() {
        return (
            <React.Fragment>
                <header className="header">
                    {
                        this.props.isAuthenticated ? (
                            <div className="container-fluid">
                                <div className="header-left">
                                    <Link onClick={this.pushHistory} className="logo" to="/#/docs" title="logo">
                                        <img src={Logo} alt="logo" />
                                    </Link>
                                </div>
                                <nav className="main-nav">
                                    <ul className="nav">
                                        <li>
                                            <a href="#">APP Console</a>
                                        </li>
                                        <li className="active">
                                            <a href="#">Documentation</a>
                                            <ul className="sub-nav">
                                                <li><a href="#">Annoucement</a></li>
                                                <li><a href="#">Getting Started</a></li>
                                                <li><a href="#">API Reference</a></li>
                                                <li><a href="#">Contact Us</a></li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a href="#">Contact Us</a>
                                        </li>
                                    </ul>
                                </nav>
                                <div className="header-right">
                                    <ul className="nav english-ensign">
                                        <li>
                                            <a href="#">
                                                <img src={EnglishLang} width="30" height="auto"
                                                    alt="" />English<span className="caret" />
                                            </a>
                                            <ul className="sub-nav">
                                                <li className="active">
                                                    <a href="#"><img src={EnglishLang} width="20"
                                                        height="auto" alt="" />English</a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a href="#">Sign in</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        ) : (
                            <div className="container">
                                <a title="logo" className="logo">
                                    <img src={Logo} alt="logo" />
                                </a>
                                <nav className="login-nav">
                                    <ul>
                                        <li>
                                            <a title="">HOME</a>
                                        </li>
                                        <li>
                                            <a title="">AD EXCHANGE</a>
                                        </li>
                                        <li>
                                            <a title="">AD SERVER</a>
                                        </li>
                                        <li>
                                            <a title="">INSIGHT ANALYTICS</a>
                                        </li>
                                        <li>
                                            <a title="">BLOG</a>
                                        </li>
                                        <li>
                                            <a title="">WIKI</a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        )
                    }
                </header>
            </React.Fragment>
        );
    }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

function mapStateToProps(state) {
    return {
        isAuthenticated: state.Layouts.loginReducer.isAuthenticated,
        headerMenu: state.Layouts.defaultHeaderReducer.headerMenu
    };
}

const mapDispatchToProps = {
    showLoading,
    hideLoading,
    updateMenu
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DefaultHeader));
