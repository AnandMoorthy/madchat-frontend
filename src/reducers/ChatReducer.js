const INITIAL_STATE = {
    userList: [],
    groupList: [],
    currentDMList: [],
    currentGroupList: [],
    selectedUser: '',
    selectedGroup: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'GET_USER_LIST_SUCCESS':
          console.log('GET USER List Success');
          return { ...state, userList: action.payload };
          case 'GET_GROUP_LIST_SUCCESS':
            console.log('GET GROUP List Success');
            return { ...state, groupList: action.payload };
          case 'GET_DIRECT_MESSAGES_DONE':
            return { ...state, currentDMList: action.payload };
          case 'GET_GROUP_MESSAGES_DONE':
            console.log('Group message done');
            return { ...state, currentGroupList: action.payload };
          case 'USER_SELECTED':
            console.log('Group message done');
            return { ...state, selectedUser: action.payload, selectedGroup: '' };
          case 'GROUP_SELECTED':
            return { ...state, selectedGroup: action.payload, selectedUser: '' };
        default:
          return state;
    }
};
