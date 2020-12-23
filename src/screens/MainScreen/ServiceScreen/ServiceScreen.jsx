import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import ServicesListScreen from './ServicesListScreen';
import NewServiceScreen from './NewServiceScreen';

const Stack = createStackNavigator();

export default React.memo(function ({navigation, ...props}) {
  const screenOptions = {
    headerShown: true,
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  };
  return (
    <Stack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={screenOptions}
    >
      <Stack.Screen options={{headerShown: false}} name="ServicesListScreen" component={ServicesListScreen} />
      <Stack.Screen options={{headerTransparent: true, headerTitle: '', headerBackTitleVisible: false, headerTintColor:'#FFF'}} name="NewServiceScreen" component={NewServiceScreen} />
    </Stack.Navigator>
  );
});
