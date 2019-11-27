import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import styles from './styles.module.less';

class ProgressLoading extends Component {
    render() {
        return (
            <Fragment>
                {
                    this.props.progressLoading ?
                        <div className={classNames(styles['progress-loading'])}>
                            <div className={classNames(styles['loading-bar'])} />
                        </div> : null
                }
            </Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        progressLoading: state.Report.progressLoadingReducer.progressLoading
    };
}

export default connect(mapStateToProps)(ProgressLoading);

