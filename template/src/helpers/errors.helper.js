import { StackActions } from '@react-navigation/compat';
import _ from 'lodash';

import colors from '../../theme/colors';

export const getErrorAlert = ({ message = 'Error', errors = {} }) => {
    const errorMessages = _.reduce(
        Object.keys(errors),
        (message, name) => {
            return `${message}${_.upperFirst(_.replace(name, '_', ' '))} ${_.nth(
                _.get(errors, name),
                0
            )}\n`;
        },
        `${message}\n`
    );

    StackActions.push({
        routeName: 'ModalLightbox',
        params: {
            content: `${errorMessages}`,
            title: message,
            backgroundColour: colors.orange
        }
    });
};
