import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import PropTypes from 'prop-types';

const propTypes = {
    label: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    activeOnlyWhenExact: PropTypes.bool
};

const defaultProps = {
    icon: 'icon-my-report-template'
};

class Navigation extends Component {
    render() {
        return (
            <Route path={this.props.to} exact={this.props.activeOnlyWhenExact} children={({match}) => (
                <li className="beta">
                    <Link className={match ? 'active' : ''} to={this.props.to} replace>
                        <i className="line-left" />
                        <span className="box-icon">
                            <i className={this.props.icon} />
                        </span>
                        <span>{this.props.label}</span>
                    </Link>
                    <i className="icon-beta-tooltip" />
                </li>
            )}
            />
        );
    }
}

Navigation.propTypes = propTypes;
Navigation.defaultProps = defaultProps;

export default Navigation;
