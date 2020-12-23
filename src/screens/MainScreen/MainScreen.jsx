import React from 'react';
import {useEffect, useState }from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import DrawerContent from './DrawerContent';
import ServiceScreen from './ServiceScreen/ServiceScreen';
import ProfileScreen from './ProfileScreen/ProfileScreen';
import MainRecommendationScreen from './RecommendScreen/MainRecommendationScreen';
import SpeedScreen from './SpeedScreen/SpeedScreen';
import ChatStack from './ChatScreen/ChatStack';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage';
import {Notifications} from 'react-native-notifications';

import {useRoute} from '@react-navigation/native';
import OurSupport from './OurSupport';

const Drawer = createDrawerNavigator();


export default React.memo(function ({navigation, ...props}) {
  const screenOptions = {};

 useEffect(() => {
    createNotificationListeners();

    AsyncStorage.getItem('userToken').then(
      (token) => console.log(token));

      Notifications.events().registerNotificationReceivedForeground((notification, completion) => {
        completion({ alert: true, sound: true, badge: true });
      });
  
      Notifications.events().registerNotificationOpened((notification, completion) => {
        completion();
      });
}, []);



  getChat = async () => {
    let chat = await AsyncStorage.getItem('support_chat');

    if (chat != null) {
        let resultChat = JSON.parse(chat);
        return resultChat;
    } else {
        return null;
    }
}

saveChat = async (chat) => {
  await AsyncStorage.setItem('support_chat', JSON.stringify(chat));
}


  createNotificationListeners = () => {
    //* КОГДА ПРИЛОЖЕНИЕ В БЕКГРАУНДЕ И ПУШ БЫЛ НАЖАТ
    messaging().onNotificationOpenedApp(async (remoteMsg) => {
      if (remoteMsg) {
        console.log('[FCM] onNotificationOpenedApp', remoteMsg);
        //ЗДЕСЬ ДЕЛАТЬ ПЕРЕХОД НА НУЖНЫЙ ЭКРАН!!!
        // const notification = remoteMsg.notification;
        let chat = await getChat();
        if (chat != null) {
          chat.push({body : remoteMsg.notification.body, id : new Date().getTime(),
          timestamp : new Date().getTime(), type : "received", image_uri : ""});
          this.saveChat(chat); 
        } else {
          chat = [{body : "Вітаю! Я можу Вам чимось допомогти?", id : 1,
          timestamp : new Date().getTime(), type : "received", image_uri : ""}, {body : remoteMsg.notification.body, id : 2,
          timestamp : new Date().getTime(), type : "received", image_uri : ""}]
          this.saveChat(chat); 
        }
        navigation.navigate('ChatStack');
      }
    });

    //* КОГДА ПРИЛОЖЕНИЕ ВЫКЛЮЧЕНО, НО ОТКРЫТО ПО ПУШУ!!!
    messaging()
      .getInitialNotification()
      .then(async (remoteMsg) => {
        if (remoteMsg) {
          let chat = await getChat();
          if (chat != null) {
            chat.push({body : remoteMsg.notification.body, id : new Date().getTime(),
              timestamp : new Date().getTime(), type : "received", image_uri : ""});
            this.saveChat(chat); 
        } else {
            chat = [{body : "Вітаю! Я можу Вам чимось допомогти?", id : 1,
            timestamp : new Date().getTime(), type : "received", image_uri : ""}, {body : remoteMsg.notification.body, id : 2,
            timestamp : new Date().getTime(), type : "received", image_uri : ""}]
           this.saveChat(chat); 
        }
        navigation.navigate('ChatStack');
      }
      });

    //* КОГДА ПРИЛОЖЕНИЕ ВЫКЛЮЧЕНО
    messaging().setBackgroundMessageHandler(async (remoteMsg) => {
      console.log('Message handled in the background!', remoteMsg);
      let chat = await getChat();
      if (chat != null) {
        chat.push({body : remoteMsg.notification.body, id : new Date().getTime(),
          timestamp : new Date().getTime(), type : "received", image_uri : ""});
       this.saveChat(chat); 
    } else {
        chat = [{body : "Вітаю! Я можу Вам чимось допомогти?", id : 1,
        timestamp : new Date().getTime(), type : "received", image_uri : ""}, {body : remoteMsg.notification.body, id : 2,
        timestamp : new Date().getTime(), type : "received", image_uri : ""}]
       this.saveChat(chat); 
    }
    navigation.navigate('ChatStack');
    });


    // ПРИЛОЖЕНИЕ АКТИВНО!!!!
    this.messageListener = messaging().onMessage(async (remoteMsg) => {

      console.log('[FCMService] new FCM message arrived!!', remoteMsg);

      let launchTime = await AsyncStorage.getItem('launch_time');
      let launchChatTime =  await AsyncStorage.getItem('launch_time_chat');
      let screen = await AsyncStorage.getItem('last_screen');
      console.warn(screen);
      if (launchChatTime != null && JSON.parse(launchTime) < JSON.parse(launchChatTime)) {
          
        console.warn(screen);
        if (screen != null && screen != 'ChatScreen') {
          Notifications.postLocalNotification({
            body: remoteMsg.notification.body,
            title: remoteMsg.notification.title,
            silent: false,
            userInfo: { }
          });
        }
          
      } else {
        Notifications.postLocalNotification({
          body: remoteMsg.notification.body,
          title: remoteMsg.notification.title,
          silent: false,
          userInfo: { }
        });
        let chat = await getChat();
        if (chat != null) {
          chat.push({body : remoteMsg.notification.body, id : new Date().getTime(),
          timestamp : new Date().getTime(), type : "received", image_uri : ""});
          this.saveChat(chat); 
        } else {
          chat = [{body : "Вітаю! Я можу Вам чимось допомогти?", id : 1,
          timestamp : new Date().getTime(), type : "received", image_uri : ""}, {body : remoteMsg.notification.body, id : 2,
          timestamp : new Date().getTime(), type : "received", image_uri : ""}]
          this.saveChat(chat); 
        }
      }
      if (remoteMsg) {
         let notification = null;
         if (Platform.OS === 'ios') {
           notification = remoteMsg.notification.title;
         } else {
            notification = remoteMsg.notification.title;
         }
      }
    });

  
    messaging().onTokenRefresh((fcmToken) => {
       // ЗДЕСЬ ОТПРАВЛЯТЬ ОБНОВЛЕННЫЙ ТОКЕН НА БЕКЕНД
    });
  };

  return (
    <Drawer.Navigator
      screenOptions={screenOptions}
      drawerType="slide"
      edgeWidth={60}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen name="ServiceScreen" component={ServiceScreen} />
      <Drawer.Screen name="ProfileScreen" component={ProfileScreen} />
      <Drawer.Screen name="MainRecommendationScreen" component={MainRecommendationScreen} />
      <Drawer.Screen name="SpeedScreen" component={SpeedScreen} />
      <Drawer.Screen name="ChatStack"  component={ChatStack} />
      <Drawer.Screen name="OurSupport"  component={OurSupport} />
    </Drawer.Navigator>
  );
});
