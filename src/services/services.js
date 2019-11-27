import axios from 'axios';

var CancelToken = axios.CancelToken;
var qs = require('qs');

import {appConfig} from 'Src/constant';
import {setCookie, getCookie} from 'Src/utils';

axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    let userInfo = getCookie(appConfig.U_OGS);
    let token = null,
        user_id = null,
        account_id = null;

    if (userInfo) {
        userInfo = JSON.parse(userInfo);

        if (userInfo.user_id && userInfo.account_id) {
            let userId = userInfo.user_id;
            let accountId = userInfo.account_id;

            let switchAccountInfo = sessionStorage.getItem('ADX_BUYER.persistent.switch.' + accountId);

            if (switchAccountInfo) {
                switchAccountInfo = JSON.parse(switchAccountInfo);

                if (switchAccountInfo.user_id) {
                    accountId = switchAccountInfo.user_id;
                    userId = switchAccountInfo.user_id;
                }
            }

            let supportAccountInfo = sessionStorage.getItem('ADX_BUYER.persistent.su.' + accountId);

            if (supportAccountInfo) {
                supportAccountInfo = JSON.parse(supportAccountInfo);
                userId = typeof supportAccountInfo.user_id !== 'undefined' ? supportAccountInfo.user_id : userId;
            }

            if (userInfo.token && userId) {
                token = userInfo.token;
                user_id = userId;
                account_id = accountId;
            }
        }
    }

    if (token && user_id && config.url && config.method) {
        switch (config.method) {
            case 'post':
            case 'put':
            case 'delete':
                if (typeof config.url === 'string') {
                    const authenticated = {
                        _token: token,
                        _user_id: user_id,
                        _account_id: account_id
                    };

                    if (config.url.indexOf('?') !== -1) {
                        config.url = config.url + '&' + qs.stringify(authenticated);
                    } else {
                        config.url = config.url + '?' + qs.stringify(authenticated);
                    }
                }
                break;
            default:
                if (config.params) {
                    config.params = {...config.params, _token: token, _user_id: user_id, _account_id: account_id};
                }
                break;
        }
    }

    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
}, function (error) {
    // Do something with response error
    if (error.response && error.response.status) {
        switch (error.response.status) {
            case 403:
                if (getCookie(appConfig.U_OGS)) {
                    //Remove cookie
                    let arrTmp = location.hostname.split('.');

                    if (arrTmp.length < 4) {
                        setCookie(U_OGS, '', -1, arrTmp.slice(-2).join('.'));
                        window.location.href = window.location.origin;
                    } else {
                        setCookie(U_OGS, '', -1, arrTmp.slice(-3).join('.'));
                        window.location.href = window.location.origin;
                    }
                }
                break;
        }
    }

    return false;
});

export const services = {
    get: function get(params) {
        if (typeof params.API_HOST !== 'undefined' && typeof params.id !== 'undefined') {
            const API_HOST = params.API_HOST;
            const cancelToken = params.cancelToken ? params.cancelToken : new CancelToken(function (cancel) {});

            delete params.API_HOST;
            delete params.cancelToken;

            return axios.get(API_HOST + '/' + params.id, {
                params: params,
                cancelToken: cancelToken
            });
        } else {
            return false;
        }
    },
    getList: function getList(params) {
        if (typeof params.API_HOST !== 'undefined') {
            const API_HOST = params.API_HOST;
            const cancelToken = params.cancelToken ? params.cancelToken : new CancelToken(function (cancel) {});

            delete params.API_HOST;
            delete params.cancelToken;

            return axios.get(API_HOST, {
                params: params,
                cancelToken: cancelToken
            });
        } else {
            return false;
        }
    },
    create: function create(params) {
        if (params.API_HOST !== 'undefined') {
            const API_HOST = params.API_HOST;

            delete params.API_HOST;

            return axios.post(API_HOST, params);
        } else {
            return false;
        }
    },
    update: function update(params) {
        if (typeof params.API_HOST !== 'undefined' && typeof params.id !== 'undefined') {
            const API_HOST = params.API_HOST;

            delete params.API_HOST;

            return axios.put(API_HOST + '/' + params.id, params);
        } else {
            return false;
        }
    },
    del: function del(params) {
        if (typeof params.API_HOST !== 'undefined' && typeof params.id !== 'undefined') {
            const API_HOST = params.API_HOST;

            delete params.API_HOST;

            return axios.delete(API_HOST + '/' + params.id, {
                params: params
            });
        } else {
            return false;
        }
    },
    upload: function upload(params) {
        if (typeof params.API_HOST !== 'undefined') {
            const API_HOST = params.API_HOST;

            delete params.API_HOST;

            let url = API_HOST + '?' + qs.stringify(params.params);

            return axios.post(url, params.formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        } else {
            return false;
        }
    }
};