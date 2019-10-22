import app from '../../../app.json';

export default function buildActionType(reducerName = '', actionName = '') {
    reducerName = reducerName.toString().trim();
    if (!reducerName) {
        throw new Error('Reducer name cannot be blank');
    }
    actionName = actionName.toString().trim();
    if (!actionName) {
        throw new Error('Action name cannot be blank');
    }
    return `${app.name}/${reducerName}/${actionName}`;
}
