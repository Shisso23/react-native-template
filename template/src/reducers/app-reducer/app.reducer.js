import CreateAction from '../action-utilities/action-creator';

const reducerName = 'app';

const setIsLoading = new CreateAction(reducerName, 'SET_IS_LOADING');
export const setIsLoadingAction = setIsLoading.action;

const initialState = {
    isLoading: false
};

export default function appReducer(state = initialState, action) {
    switch (action.type) {
        case setIsLoading.actionType:
            return { ...state, isLoading: action.payload };
        default:
            return state;
    }
}
