import axios from 'axios';
import url from '../components/common/BaseURL';
import { hashHistory } from 'react-router';

const baseURL = url.baseURL;

export const onUsernameChange = (text) => {
    return {
        type: 'USERNAME_CHANGED',
        payload: text
    };
};

export const onPasswordChange = (text) => {
    return {
        type: 'PASSWORD_CHANGED',
        payload: text
    };
};

export const userLogin = (username, password) => {
    console.log('User Login Action');
    console.log(username, password);
    return (dispatch) => {
        // dispatch({ type: 'LOGIN' });
        axios.post(baseURL + '/auth/login/', {}, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            data: {
              username,
              password
            }
        }).then(response => {
            console.log(response.data);
            localStorage.setItem('user', JSON.stringify(response.data));
            dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
            hashHistory.push('/Home');
        }).catch(err => {
            // dispatch({ type: 'LOGIN_FAIL' });
            console.log(err, err.response);
        });
    };
};
