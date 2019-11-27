// Libraries
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// Assets
import './styles.less';

class SwitchButton extends Component {
    static defaultProps = {
        color: '#9cce24',
        checked: true
    };

    render() {
        return (
            <div className={classnames('custom-switch d-inline-block', {'on-off': this.props.className})} onChange={this.props.onChange}>
                <input type="checkbox" id={this.props.id} checked={this.props.checked} readOnly />
                <label htmlFor={this.props.id} style={this.props.checked ? {backgroundColor: this.props.color} : {backgroundColor: '#c5c5c5'}} />
                {this.props.isLoading ? (
                    <div className="loading">
                        <div className="loading-icon" />
                    </div>
                ) : null}
            </div>
        );
    }
}

SwitchButton.propTypes = {
    id: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func
};

export default SwitchButton;
