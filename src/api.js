import React, {useState, useEffect} from 'react';
import {Platform} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {getModel} from 'react-native-device-info';

const os = Platform.OS + ' ' + Platform.Version;
const device = getModel();

const request = (request, body) =>
  fetch(
    `https://my.support.ua/mobile-api/${request}?api_key=55d41bafc7d483d86d31c9c7d3e6cfea`,
    body && {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  )
    .then((res) => res.json())
    .catch(console.log);

const Context = React.createContext([null, {}]);

function Provider({children}) {
  const [token, setToken] = useState(null);

  useEffect(function () {
    AsyncStorage.getItem('userToken').then(
      (token) => {
        if (token) {
          AsyncStorage.getItem('fcmToken').then(
            (device_id_token) => {
              if (device_id_token) {
                console.log('TOKEN');
                api.login({token,device_id_token});
              } else {
                console.log('NO TOKEN');
                api.login({token:token});
              }
          });
        }
      });
  }, []);

  const tokenRefresh = (tok) => {
    (tok !== null
      ? AsyncStorage.setItem('userToken', tok)
      : AsyncStorage.removeItem('userToken')
    )
      .then(() => setToken(tok))
      .catch(console.log);
  };

  const api = {
    signup: (body) =>
      request('signup', body).then((res) => {
        console.log('SIGNUP');
        res.status === 'ok' && tokenRefresh(res.token);
        return new Promise((fn) => fn(res));
      }),
     
    login: (body) =>
      request('login', {...body, os, device}).then((res) => {
        res.status === 'ok' && tokenRefresh(res.token);
        return new Promise((fn) => fn(res));
      }),

    exit: () => tokenRefresh(null),
    resetPassword: (body) => request('reset-password', body),
    getUserData: (body) => request('get-user-data', body),
    getUserServices: () => request('get-user-services', {token}),
    getStores: () => request('get-stores'),
    getServices: (body) => request('get-services', body),
    activation: (body) => request('activation', {token, ...body}),
    getRecomendations: () => request('get-recommendations'),
    getRecomendation: (body) => request('get-recommendation', body),
    getSpeedTests: () => request('get-speedtest-results', {token}),
    setSpeedTest: (body) => request('speedtest', {token, ...body})
  };

  return <Context.Provider value={[token, api]}>{children}</Context.Provider>;
}

export {Context, Provider};
