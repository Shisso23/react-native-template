import CreateAction from '../action-utilities/action-creator';

const reducerName = 'user';

const setIsLoading = new CreateAction(reducerName, 'SET_IS_LOADING');
export const setIsLoadingAction = setIsLoading.action;

const setUsername = new CreateAction(reducerName, 'SET_USERNAME');
export const setUsernameAction = setUsername.action;

const setPassword = new CreateAction(reducerName, 'SET_PASSWORD');
export const setPasswordAction = setUsername.action;

const initialState = {
    isLoading: false,
    username: '',
    password: ''
};

export default function taskReducer(state = initialState, action) {
    switch (action.type) {
        case setIsLoading.actionType:
            return { ...state, isLoading: action.payload };
        case setUsername.actionType:
            return { ...state, username: action.payload };
        case setPassword.actionType:
            return { ...state, password: action.payload };
        default:
            return state;
    }
}
