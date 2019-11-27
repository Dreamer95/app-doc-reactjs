import routes from 'Src/routes';
import {matchPath} from 'react-router';

export const checkJSON = function(_str) {
    let result = true;

    try {
        JSON.parse(_str);
    } catch (e) {
        result = false;
    }

    return result;
};

export const formatUserId = function(userId) {
    if (!userId || !userId.length) {
        return '';
    } else {
        userId = userId.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
        return userId;
    }
};

export const setCookie = function(name, value, exdays, domain) {
    let d = new Date();

    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = 'expires=' + d.toGMTString();

    document.cookie = name + '=' + value + ';' + expires + ';domain=' + domain + ';path=/';
};

export const getCookie = function(cname) {
    let name = cname + '=';
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');

    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];

        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }

    return '';
};

export const random = function(number) {
    let text = '';
    let possible = 'abcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < number; i++) {text += possible.charAt(Math.floor(Math.random() * possible.length))}

    return text;
};

export const getMatchFromPath = (path) => {
    let result = null;

    routes.forEach(function(route) {
        const match = matchPath(path, {
            path: route.path,
            exact: true,
            strict: false
        });

        if (match && match.params && match.path && route.state) {
            result = {
                ...match,
                state: route.state
            };

            return result;
        }
    });

    return result;
};

export const getLinkFromState = (state, params) => {
    let url = '';

    if (state) {
        routes.map((route) => {
            if (route.state && route.state === state) {
                let path = route.path;

                if (params) {
                    Object.keys(params).map((param) => {
                        path = path.split(`:${param}`).join(params[param]);
                    });
                }
                url = path;
            }
        });
    }

    return url;
};

export const formatFilter = (filters) => {
    let filter = [];

    for (let filters1 of filters) {
        let filter1 = [];

        for (let filterValue of filters1.filter_value) {
            let filter2 = [];

            for (let item of filterValue) {
                filter2 = [...filter2, {[item.field_name.name]:{[item.operator.name]: item.value}}];
            }

            filter1 = [...filter1, ...filter2];
        }

        filter = [...filter, ...filter1];
    }
    return filter;
};
