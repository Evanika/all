import React from 'react';
import {StatusBar} from 'react-native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import SuccessStep from '../../components/stepComponents/SuccessStep';

import LoginFormScreen from './LoginFormScreen/LoginFormScreen';
import ForgotScreen from './ForgotScreen/ForgotScreen';
import RegistScreen1 from './RegistScreens/RegistScreen1';
import RegistScreen2 from './RegistScreens/RegistScreen2';
import RegistScreen3 from './RegistScreens/RegistScreen3';

const Stack = createStackNavigator();

export default React.memo(function () {
  const screenOptions = {
    headerShown: true,
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#ffc107" />
      <Stack.Navigator
        initialRouteName="LoginFormScreen"
        screenOptions={screenOptions}
      >
        <Stack.Screen options={{headerShown: false}} name="LoginFormScreen" component={LoginFormScreen} />
        <Stack.Screen options={{headerTransparent: true, headerTitle: '', headerBackTitleVisible: false, headerTintColor:'#FFF'}} name="ForgotScreen" component={ForgotScreen} />
        <Stack.Screen options={{headerTransparent: true, headerTitle: '', headerBackTitleVisible: false, headerTintColor:'#FFF'}} name="RegistScreen1" component={RegistScreen1} />
        <Stack.Screen name="RegistScreen2" component={RegistScreen2} />
        <Stack.Screen name="RegistScreen3" component={RegistScreen3} />
        <Stack.Screen options={{headerTransparent: true, headerTitle: '', headerBackTitleVisible: false, headerTintColor:'#FFF'}} name="SuccessStep" component={SuccessStep} />
      </Stack.Navigator>
    </>
  );
});
