import { Actions } from 'react-native-router-flux';
import _ from 'lodash';

import colors from '../../theme/colors';
import ModalLightbox from '../scenes/modal-lightbox/modal.lightbox';

export const getErrorAlert = ({ message = 'Error', errors = {} }) => {
    const errorMessages = _.reduce(
        Object.keys(errors),
        (message, name) => {
            return `${message}${_.upperFirst(_.replace(name, '_', ' '))} ${_.nth(
                _.get(errors, name),
                0
            )}\n`;
        },
        message
    );

    Actions.push(ModalLightbox.key, {
        content: `${errorMessages}`,
        title: message,
        backgroundColour: colors.orange
    });
};
