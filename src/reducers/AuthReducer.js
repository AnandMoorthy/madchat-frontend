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
          console.log('Username Change Reducer');
          return { ...state, username: action.payload };
        case 'PASSWORD_CHANGED':
          console.log('Password Change Reducer');
          return { ...state, password: action.payload };
        case 'LOGIN_SUCCESS':
          return { ...state, token: action.payload.token };
        default:
          return state;
    }
};
