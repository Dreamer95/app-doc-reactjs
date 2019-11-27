// Libraries
import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// Assets
import styles from './styles.module.less';

const propTypes = {
    label: PropTypes.string,
    to: PropTypes.string,
    activeOnlyWhenExact: PropTypes.bool
};

const defaultProps = {};

class NavLink extends Component {
    render() {
        return (
            <Route path={this.props.to} exact={this.props.activeOnlyWhenExact} children={({match}) => (
                <li className={classnames({[styles[this.props.activeClassName]]: match})} title={this.props.label}>
                    <Link to={this.props.to}>{this.props.label}</Link>
                </li>
            )}
            />
        );
    }
}

NavLink.propTypes = propTypes;
NavLink.defaultProps = defaultProps;

export default NavLink;
