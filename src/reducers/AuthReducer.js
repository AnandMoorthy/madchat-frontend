var jwtDecode = require('jwt-decode');

const INITIAL_STATE = {
    username: '',
    user: '',
    password: '',
    text: '',
    token: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'USERNAME_CHANGED':
          return { ...state, username: action.payload };
        case 'PASSWORD_CHANGED':
          return { ...state, password: action.payload };
        case 'LOGIN_SUCCESS':
          const user = jwtDecode(action.payload.token)
          return { ...state, token: action.payload.token, user };
        default:
          return state;
    }
};
