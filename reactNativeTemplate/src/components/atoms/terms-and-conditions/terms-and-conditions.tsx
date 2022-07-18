import React from 'react';
import { View, TouchableOpacity, GestureResponderEvent } from 'react-native';
import { CheckBox, Text } from '@rneui/themed';
import tw from 'twrnc';

import { useTheme } from '../../../hooks';

type TermsAndConditionsProps = {
  checked: boolean;
  onPress: (event: GestureResponderEvent) => void;
};

export const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({ checked, onPress }) => {
  const { Colors } = useTheme();

  return (
    <View style={tw`flex flex-row items-center`}>
      <CheckBox checked={checked} onPress={onPress} checkedColor={Colors.primary} />
      <Text>I agree to the</Text>
      <TouchableOpacity delayPressIn={0} onPress={() => null}>
        <Text style={tw`colors-blue`}> Terms and Conditions</Text>
      </TouchableOpacity>
    </View>
  );
};
