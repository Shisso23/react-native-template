import userService from '../../services/sub-services/user-service/user.service';
import { setIsLoadingAction as setAppIsLoadingAction } from '../app-reducer/app.reducer';
import { resetAction, setIsLoadingAction, setIsSignedInAction } from './user.reducer';

export const signIn = () => {
    return (dispatch, getState) => {
        dispatch(setIsLoadingAction(true));

        const { login, password } = getState().userReducer;

        return userService
            .signIn({ login, password })
            .then((response) => {
                return response;
            })
            .finally(() => dispatch(setIsLoadingAction(false)));
    };
};

export const signUp = () => {
    return (dispatch, getState) => {
        dispatch(setIsLoadingAction(true));

        const { username, password } = getState().userReducer;
        const data = {
            username,
            password
        };

        return userService
            .signUp(data)
            .then((resp) => {
                return resp;
            })
            .finally(() => dispatch(setIsLoadingAction(false)));
    };
};

export const sendOtp = () => {
    return () => {
        return true;
    };
};

export const verifyOtp = () => {
    return (dispatch) => {
        dispatch(setIsLoadingAction(true));
        dispatch(setIsLoadingAction(false));
        return true;
    };
};

export const signOut = () => {
    return (dispatch) => {
        dispatch(setAppIsLoadingAction(true));
        return userService
            .signOut()
            .then(() => {
                dispatch(resetAction());
            })
            .finally(() => dispatch(setAppIsLoadingAction(false)));
    };
};

export const checkIsSignedIn = () => {
    return (dispatch) => {
        return userService.isSignedIn().then((status) => {
            dispatch(setIsSignedInAction(status));
        });
    };
};

export const getUser = () => {
    return (dispatch) => {
        dispatch(setAppIsLoadingAction(true));
        return userService.getUser().finally(() => dispatch(setAppIsLoadingAction(false)));
    };
};

export const forgotPassword = () => {
    return (dispatch, getState) => {
        const { login } = getState().userReducer;
        dispatch(setIsLoadingAction(true));
        return userService.forgotPassword(login).finally(() => dispatch(setIsLoadingAction(false)));
    };
};

export const sendResetOtp = () => {
    return () => {
        return true;
    };
};

export const verifyResetOtp = () => {
    return (dispatch) => {
        dispatch(setIsLoadingAction(true));
        dispatch(setIsLoadingAction(false));
        return true;
    };
};

export const resetPassword = (token, password) => {
    return (dispatch) => {
        dispatch(setIsLoadingAction(true));
        return userService
            .resetPassword(password)
            .finally(() => dispatch(setAppIsLoadingAction(false)));
    };
};
