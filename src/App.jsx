import 'react-native-gesture-handler';

import React from 'react';
import {useEffect, useState }from 'react';
import {View, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Context, Provider} from './api';
import AsyncStorage from '@react-native-community/async-storage';

import LoginScreen from './screens/LoginScreen/LoginScreen';
import MainScreen from './screens/MainScreen/MainScreen';
import OurSupport from './screens/MainScreen/OurSupport';
import SplashScreen from './screens/LoginScreen/LoginFormScreen/SplashScreen';
const screenOptions = {
  headerShown: false,
  cardStyleInterpolator: global.cardStyleInterpolatorBottom,
};

const Stack = createStackNavigator();

const styles = StyleSheet.create({
  global: {flex: 1},
});

export default React.memo(function ({...props}) {

  const routeNameRef = React.useRef();
  const navigationRef = React.useRef();

  useEffect(() => {
  
    AsyncStorage.setItem('launch_time', JSON.stringify(new Date().getTime()));
  }, []);

  return (
    <Provider>
      <Context.Consumer>
        {([token]) => (
          <View style={styles.global}>
            <NavigationContainer
            ref={navigationRef}
            onReady={() => routeNameRef.current = navigationRef.current.getCurrentRoute().name}
            onStateChange={() => {
              const previousRouteName = routeNameRef.current;
              const currentRouteName = navigationRef.current.getCurrentRoute().name
              if (previousRouteName !== currentRouteName) {
                AsyncStorage.setItem('last_screen', currentRouteName);
              }
      
              // Save the current route name for later comparision
              routeNameRef.current = currentRouteName;
            }}
            >
              <Stack.Navigator screenOptions={screenOptions}>
                <Stack.Screen name="SplashScreen" component={SplashScreen} />
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen name="MainScreen" component={MainScreen} />
              </Stack.Navigator>
            </NavigationContainer>
          </View>
        )}
      </Context.Consumer>
    </Provider>
  );
});
