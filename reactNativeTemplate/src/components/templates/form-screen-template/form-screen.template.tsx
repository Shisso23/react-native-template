import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { FormScreenContainerProps } from './types';

export const FormScreenTemplate: React.FC<FormScreenContainerProps> = ({
  children,
  contentContainerStyle,
}) => (
  <KeyboardAwareScrollView
    contentContainerStyle={contentContainerStyle}
    keyboardShouldPersistTaps="handled"
  >
    {children}
  </KeyboardAwareScrollView>
);
