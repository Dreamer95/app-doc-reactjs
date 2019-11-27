import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import classnames from 'classnames';
import {getCookie, setCookie, formatUserId} from 'Src/utils';
import {appConfig} from 'Src/constant';

//Actions
import * as errorActions from 'Modules/Layouts/containers/Error/actions';

//Assets
import AccessDeniedImage from 'Assets/images/img-access-denied.png';
import styles from './styles.module.less';

class Error extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accessUserId: ''
        };
    }

    componentDidUpdate() {
        if(this.props.routeInfo && this.props.routeInfo.params &&
            this.props.routeInfo.params.userId !== this.state.accessUserId){
            this.setState({
                accessUserId: this.props.routeInfo.params.userId
            });
        }
    }

    onClickGoBack() {
        this.props.updateError({
            isAccessDenied: false
        });

        if (document.referrer) {
            this.props.history.goBack();
        } else {
            this.props.history.push('/' + this.props.userId + '/report/my-report-template');
        }
    }

    onClickSignDifferentUser() {
        if (getCookie(appConfig.U_OGS)) {
            const userInfo = JSON.parse(getCookie(appConfig.U_OGS));

            if(userInfo && userInfo.account_id){
                sessionStorage.removeItem('ADX_BUYER.persistent.switch.' + userInfo.account_id);
                sessionStorage.removeItem('ADX_BUYER.persistent.su.' + userInfo.account_id);
            }

            let arrTmp = location.hostname.split('.');

            if (arrTmp.length < 4) {
                setCookie(appConfig.U_OGS, '', -1, arrTmp.slice(-2).join('.'));
            } else {
                setCookie(appConfig.U_OGS, '', -1, arrTmp.slice(-3).join('.'));
            }

            this.props.updateLogin({
                userId: null,
                fullName: null,
                email: null,
                avatar: null,
                isAuthenticated: false
            });

            this.props.updateError({
                isAccessDenied: false
            });
        }
    }

    render() {
        let isShowGoBack = false;

        if(this.props.history && this.props.history.goBack){
            isShowGoBack = true;
        }

        let accessUserId = formatUserId(this.state.accessUserId);

        return (
            <div className="outer-content pl-0">
                <div className="container-fluid">
                    <div className={classnames(styles['block-inner-content'], 'block-inner-content position-absolute')}>
                        <div className="inner-content">
                            <div className={styles['access-denied']}>
                                <div className={styles['block-image']}>
                                    <img className="" src={AccessDeniedImage} width="123" height="109" alt="" />
                                </div>
                                <h4 className={styles['title']}>Access Denied</h4>
                                <p className={styles['info']}>You haven't had permission to access to {accessUserId} yet.
                                    <span>Contact this account owner or log in with another user.</span></p>
                                <div className="clearfix">
                                    {
                                        isShowGoBack ? (
                                            <button type="button" onClick={this.onClickGoBack.bind(this)} className="btn btn-green btn-back mr-15">GO BACK</button>
                                        ) : null
                                    }
                                    <button type="button" onClick={this.onClickSignDifferentUser.bind(this)} className="btn btn-grey">Sign in with a different user</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        userId: state.Layouts.loginReducer.userId,
        routeInfo: state.Layouts.defaultMainReducer.routeInfo
    };
}

const mapDispatchToProps = {
    ...errorActions
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Error));
