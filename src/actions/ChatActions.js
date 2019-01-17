import axios from 'axios';
import url from '../components/common/BaseURL';
// import { hashHistory } from 'react-router';

const baseURL = url.baseURL;

export const getUserList = (token) => {
    return (dispatch) => {
        axios.get(baseURL + '/users/', {
            headers: {
              Authorization: `Bearer ${token}`
            }
        }).then(response => {
            dispatch({ type: 'GET_USER_LIST_SUCCESS', payload: response.data });
        }).catch(err => {
            console.log(err);
        });
    };
};

export const getGroupList = (token) => {
    return (dispatch) => {
        axios.get(baseURL + '/groups/', {
            headers: {
              Authorization: `Bearer ${token}`
            }
        }).then(response => {
            dispatch({ type: 'GET_GROUP_LIST_SUCCESS', payload: response.data });
        }).catch(err => {
            console.log(err);
        });
    };
};

export const getUserChatDetails = (user, token) => {
    return (dispatch) => {
        axios.get(baseURL + `/dm/${user.id}/`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
        }).then(response => {
            dispatch({
              type: 'GET_DIRECT_MESSAGES_DONE',
              payload: response.data
            });
        }).catch(err => {
            console.log(err);
        });
    };
};

export const getGroupChatDetails = (group, token) => {
    return (dispatch) => {
        axios.get(baseURL + `/group/${group.id}/`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
        }).then(response => {
            dispatch({
              type: 'GET_GROUP_MESSAGES_DONE',
              payload: response.data
            });
        }).catch(err => {
            // dispatch({ type: 'GET_GROUP_LIST_FAIL' });
            console.log(err);
        });
    };
};
