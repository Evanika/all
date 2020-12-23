import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import RecommendScreen from './RecommendScreen';
import RecommendationScreen from './RecommendationScreen';

const Stack = createStackNavigator();

export default React.memo(function ({navigation, ...props}) {
  const screenOptions = {
    headerShown: false,
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  };
  return (
    <Stack.Navigator
      initialRouteName="RecommendScreen"
      screenOptions={screenOptions}
    >
      <Stack.Screen name="RecommendScreen" component={RecommendScreen} />
      <Stack.Screen name="RecommendationScreen" component={RecommendationScreen} />
    </Stack.Navigator>
  );
});
