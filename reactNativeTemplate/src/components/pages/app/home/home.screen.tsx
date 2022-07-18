import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Button } from '@rneui/themed';
import { useDispatch } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

import { exitAppOnHardwarePressListener } from '../../../../helpers';
import { signOutAction } from '../../../../reducers/user-auth-reducer/user-auth.actions';

const { CancelToken } = axios;

export const HomeScreen: React.FC = () => {
  const requestSource = CancelToken.source();
  const dispatch = useDispatch();

  const _signOut = () => {
    dispatch(signOutAction());
  };

  useEffect(() => {
    return () => {
      requestSource.cancel();
    };
  });

  useFocusEffect(exitAppOnHardwarePressListener);

  return (
    <View>
      <Button title="Sign Out" onPress={_signOut} />
    </View>
  );
};
