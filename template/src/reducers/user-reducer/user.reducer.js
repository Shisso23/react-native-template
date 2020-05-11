import CreateAction from '../action-utilities/action-creator';

const reducerName = 'user';

const setIsLoading = new CreateAction(reducerName, 'SET_IS_LOADING');
export const setIsLoadingAction = setIsLoading.action;

const setIsSignedIn = new CreateAction(reducerName, 'SET_IS_SIGNED_IN');
export const setIsSignedInAction = setIsSignedIn.action;

const setId = new CreateAction(reducerName, 'SET_ID');
export const setIdAction = setId.action;

const setUsername = new CreateAction(reducerName, 'SET_USERNAME');
export const setUsernameAction = setUsername.action;

const setLogin = new CreateAction(reducerName, 'SET_LOGIN');
export const setLoginAction = setLogin.action;

const setPassword = new CreateAction(reducerName, 'SET_PASSWORD');
export const setPasswordAction = setPassword.action;

const setConfirmPassword = new CreateAction(reducerName, 'SET_CONFIRM_PASSWORD');
export const setConfirmPasswordAction = setConfirmPassword.action;

const reset = new CreateAction(reducerName, 'RESET');
export const resetAction = reset.action;

const initialState = {
    isLoading: false,
    isSignedIn: false,
    id: '',
    login: '',
    username: '',
    password: '',
    confirmPassword: ''
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case setIsLoading.actionType:
            return { ...state, isLoading: action.payload };
        case setIsSignedIn.actionType:
            return { ...state, isSignedIn: action.payload };
        case setId.actionType:
            return { ...state, id: action.payload };
        case setUsername.actionType:
            return { ...state, username: action.payload };
        case setLogin.actionType:
            return { ...state, login: action.payload };
        case setPassword.actionType:
            return { ...state, password: action.payload };
        case setConfirmPassword.actionType:
            return { ...state, confirmPassword: action.payload };
        case reset.actionType:
            return initialState;
        default:
            return state;
    }
}
