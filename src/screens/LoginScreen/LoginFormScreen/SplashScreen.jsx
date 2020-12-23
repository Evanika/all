import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  Image,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Bubbles} from 'react-native-loader';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage';
import BadgeAndroid  from 'react-native-android-badge';
import LoginForm from './LoginForm';

const styles = StyleSheet.create({
  BG: {
    position: 'absolute',
    width: '100%',
  },
  container: {flex: 1, alignItems:'center', justifyContent:'center'},
  scroll: {
    width: '100%',
    alignItems: 'center',
    flexGrow: 1,
    marginBottom: 10,
  },
  logo: {
    width: 300,
    height: 150,
    marginBottom: 40, 
    resizeMode: 'contain'
  },
});

export default React.memo(function ({navigation}) {
  const {width, height} = useWindowDimensions();

  useEffect(() => {
   // BadgeAndroid.setBadge(0);
    requestUserPermission();
      getToken();
  
    
      setTimeout(() => {
        AsyncStorage.getItem('userToken').then(
          (token) => {
            if (token != null) {
                navigation.replace('MainScreen');
            } else {
                navigation.replace('LoginScreen');
            }
          });
      }, 2500);
     
  
  }, []);

  requestUserPermission = async() => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  getToken = async() => {
    //ЗДЕСЬ ЖЕЛАТЕЛЬНО ОТПРАВИТЬ ТОКЕН НА БЕКЕНД!
    messaging()
    .getToken()
    .then((fcmToken) => {
      console.log('Got fcm token', fcmToken);
      AsyncStorage.setItem('fcmToken', fcmToken);
      if (fcmToken) {
        //
      } else {
        console.log("[FCMService] User doesn't have a device token ");
      }
    })
    .catch((error) => {
      console.log(
        '[FCMService] got error while getting token , token rejected',
        error,
      );
    });
  }


  return (
    <View
      style={styles.container}
    >
      <LinearGradient
        style={[styles.BG, {height}]}
        colors={['#ffc107', '#000000']}
      />
      <Image source={require('./media/bg.png')} style={[styles.BG, {height}]} />
      <View style={{width: width, height: height, alignItems:'center', justifyContent:'center'}}>
          <Image source={require('./media/logo.png')} style={styles.logo}></Image>
          <Bubbles size={15} color="ffc107" />
      </View>
    </View>
  );
});
