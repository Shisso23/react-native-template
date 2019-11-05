import { Actions } from 'react-native-router-flux';
import _ from 'lodash';

import colors from '../../theme/colors';
import ModalLightbox from '../scenes/modal-lightbox/modal.lightbox';

export const getErrorAlert = ({ message = '', errors = [] }) => {
    const errorMessages = _.reduce(
        errors,
        (message, current) => {
            return `${message}${current}\n`;
        },
        ''
    );

    Actions.push(ModalLightbox.key, {
        content: `${errorMessages}`,
        title: message,
        backgroundColour: colors.orange
    });
};
