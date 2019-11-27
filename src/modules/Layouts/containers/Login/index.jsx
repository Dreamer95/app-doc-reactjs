import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {appConfig} from 'Src/constant';
import {checkJSON, setCookie, getCookie} from 'Src/utils';

// Assets
import ComputerImage from 'Assets/images/img-computer.jpg';
import Loading from 'Assets/images/loading.gif';
import 'Assets/css/login.less';

//Actions
import * as loginActions from './actions';
import * as errorActions from 'Modules/Layouts/containers/Error/actions';

class Login extends Component {
    componentDidMount() {
        const props = this.props;

        if(getCookie(appConfig.U_OGS)){
            const userInfo = JSON.parse(getCookie(appConfig.U_OGS));

            let userId = userInfo.user_id ? userInfo.user_id : '';
            let accountId = userInfo.account_id ? userInfo.account_id : '';
            let role = userInfo.role ? +userInfo.role : 1;
            let email =  '';
            let fullName = '';
            let avatar = '';

            //set isAuthenticated
            props.updateLogin({
                userId: userId,
                accountId: accountId,
                role: role,
                fullName: fullName,
                email: email,
                avatar: avatar,
                isAuthenticated: true,
                isUserChecked: true
            });
        } else {
            props.updateLogin({
                isUserChecked: true
            });
        }

        window.addEventListener('message', function (e) {
            if(checkJSON(e.data)){
                const loginInfo = JSON.parse(e.data);

                if(loginInfo.action === 'ogs-authenticate'){
                    if (typeof(Storage) !== 'undefined') {
                        if (loginInfo.user_id){
                            localStorage.setItem('user_logged_in_user_id', loginInfo.user_id);
                        }

                        if (loginInfo.email){
                            localStorage.setItem('user_logged_in_email', loginInfo.email);
                        }

                        if (loginInfo.full_name){
                            localStorage.setItem('user_logged_in_full_name', loginInfo.full_name);
                        }

                        if (loginInfo.avatar){
                            localStorage.setItem('user_logged_in_avatar', loginInfo.avatar);
                        }
                    }

                    if(!getCookie(appConfig.U_OGS)){
                        let postData = {
                            token: loginInfo.token,
                            user_id: loginInfo.user_id,
                            account_id: loginInfo.account_id,
                            role: loginInfo.role ? loginInfo.role : appConfig.TYPE_ACCOUNT_BUYER,
                            seller_role: loginInfo.seller_role ? loginInfo.seller_role : 0,
                            conversion_id: loginInfo.conversion_id ? loginInfo.conversion_id : ''
                        };

                        let arrTmp = location.hostname.split('.');

                        if(arrTmp.length < 4){
                            setCookie(U_OGS, JSON.stringify(postData), 1, arrTmp.slice(-2).join('.'));
                        }else{
                            setCookie(U_OGS, JSON.stringify(postData), 1, arrTmp.slice(-3).join('.'));
                        }

                        //Update isAuthenticated
                        props.updateLogin({
                            isAuthenticated: true,
                            userId: loginInfo.user_id,
                            email: loginInfo.email ? loginInfo.email : null,
                            fullName: loginInfo.full_name ? loginInfo.full_name : '',
                            avatar: loginInfo.avatar ? loginInfo.avatar : ''
                        });
                    }
                }
            }
        });
    }

    renderLoginDefault = () => {
        const isLogin = getCookie(appConfig.U_OGS);

        return (
            <div className="outer-content">
                <div className="container">
                    <div className="block-login">
                        <div className="login-left">
                            <div className="login-label">
                                <p>ANTS – Empowering the Digital Media<br />Ad Exchange, Ad Server, Analytics</p>
                                <span>Unleash the full economic potential of #Digital Business!</span>
                            </div>

                            <div className="login-computer">
                                <img src={ComputerImage} width="224" height="295" alt="" />
                                <ul>
                                    <li><i className="icon-maximize" />Maximinze<br />Publisher Revenue</li>
                                    <li><i className="icon-demographic" />Demographic<br />Contextual Targeting</li>
                                    <li><i className="icon-yeild-optiminzation" />Yeild Optiminzation<br />With Ad Exchange</li>
                                    <li><i className="icon-pricing-model" />Pricing Models:<br />CPD, CPM, CPC, CPV, CPA</li>
                                    <li><i className="icon-manage-ad" />Manage Ad Across<br />PC, Mobile, Video and APPs</li>
                                </ul>
                            </div>
                        </div>

                        <div className="login-right">
                            {
                                !isLogin ? (
                                    <iframe className="login-iframe" app-id={appConfig.API_ID} pro-id={appConfig.PROJECT_ID} src={appConfig.AUTH_ADX_DOMAIN + 'account/login#?app_id=' + appConfig.API_ID + '&p_id=' + appConfig.PROJECT_ID} />
                                ) : null
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    render() {
        return (
            <Fragment>
                {
                    !this.props.isUserChecked ? (
                        <div id="loading">
                            <img src={Loading} alt="Loading" /><br />
                            <span>Loading...</span>
                        </div>
                    ) : (
                        this.renderLoginDefault()
                    )
                }
            </Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        isUserChecked: state.Layouts.loginReducer.isUserChecked,
        isAuthenticated: state.Layouts.loginReducer.isAuthenticated
    };
}

const mapDispatchToProps = {
    ...loginActions,
    ...errorActions
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
