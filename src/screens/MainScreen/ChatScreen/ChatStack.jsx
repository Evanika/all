import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import ChatScreen from './ChatScreen';
import ImageViewScreen from './ImageViewScreen';

const Stack = createStackNavigator();

export default React.memo(function ({navigation, ...props}) {
  const screenOptions = {
    headerShown: false,
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  };
  return (
    <Stack.Navigator
      initialRouteName="ChatScreen"
      screenOptions={screenOptions}
    >
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
      <Stack.Screen name="ImageViewScreen" component={ImageViewScreen} />
    </Stack.Navigator>
  );
});
