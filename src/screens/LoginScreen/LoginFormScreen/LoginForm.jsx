import React, {useState, useContext} from 'react';
import {View, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import TextSemiBold from '../../../components/TextSemiBold';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import {Context} from '../../../api';
const styles = StyleSheet.create({
  extra: {
    width: '90%',
    marginTop: 20,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  extraBtn: {
    padding: 8,
  },
  extraBtnText: {
    color: 'rgba(255,255,255, 0.5)',
    fontSize: 16,
  },
});

function ExtraBtn({children, onPress}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.extraBtn}>
      <TextSemiBold style={styles.extraBtnText}>{children}</TextSemiBold>
    </TouchableOpacity>
  );
}

export default function ({navigation}) {
  const [disabled, setDisabled] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [token, api] = useContext(Context);

  function nextStep() {
    if (email.trim() === '') {
      Alert.alert('Поле "Email" не може бути порожнім');
    } else if (password === '') {
      Alert.alert('Поле "Пароль" не може бути порожнім');
    } else {
      setDisabled(true);
      AsyncStorage.getItem('fcmToken').then(
        (device_id_token) => {
          if (device_id_token) {
            console.log('TOKEN');
            api.login({email: email.trim(), password,device_id_token}).then((res) => {
              console.log(res);
              Alert.alert(res.message);
              setDisabled(false);
              if (res.status != "error") {
                navigation.replace("SplashScreen");
              }
            });
          } else {
            console.log('NO TOKEN');
            api.login({email: email.trim(), password}).then((res) => {
              Alert.alert(res.message);
              setDisabled(false);
              if (res.status != "error") {
                navigation.replace("SplashScreen");
              }
            });
          }
      });
    }
  }

  return (
    <>
      <Input
        mask=""
        placeholder="Email"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        icon={require('../../../icons/IconMailWhite50.png')}
      />
      <Input
        mask=""
        autoCompleteType="password"
        secureTextEntry={true}
        textContentType="password"
        placeholder="Пароль"
        keyboardType="default"
        autoCapitalize="none"
        value={password}
        onChangeText={setPassword}
        icon={require('../../../icons/IconPasswordWhite50.png')}
      />
      <Button
        yellow
        style={{marginTop: 12}}
        disabled={disabled}
        onPress={nextStep}
      >
        Увійти
      </Button>
      <View style={styles.extra}>
        <ExtraBtn onPress={() => navigation.navigate('RegistScreen1')}>
          Створити акаунт
        </ExtraBtn>
        <ExtraBtn onPress={() => navigation.navigate('ForgotScreen')}>
          Забули пароль
        </ExtraBtn>
      </View>
    </>
  );
}
