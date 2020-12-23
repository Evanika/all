import React, {useState, useContext, useEffect} from 'react';
import {StyleSheet, Keyboard, Alert} from 'react-native';

import StepWrapper from '../../../components/stepComponents/StepWrapper';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import {Context} from '../../../api';
import DateInput from '../../../components/DateInput';
import AsyncStorage from '@react-native-community/async-storage';

const styles = StyleSheet.create({
  button: {
    marginTop: 40,
  },
});

const EmailRegEx = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

export default React.memo(function ({navigation, route}) {
  const [token, {signup}] = useContext(Context);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirm_password] = useState('');
  const [disabled, setDisabled] = useState(false);
  
  const [surname, setSurname] = useState('');
  const [name, setName] = useState('');
  const [patronymic, setPatronymic] = useState('');

  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [birthday, setBirthday] = useState('');
  const [fcmToken, setFcmToken] = useState('');


  useEffect(() => {
    requestUserPermission();
    AsyncStorage.getItem('fcmToken').then(
      (token) => {
        setFcmToken(token);
      });
  }, []);

  function nextStep() {
    if (!EmailRegEx.test(email.trim())) {
      Alert.alert('Поле "Email" не вірно');
    } else if (password.length < 6) {
      Alert.alert('Мінімальна довжина пароля 6 символів');
    } else if (password !== confirm_password) {
      Alert.alert('Паролі не співпадають');
    } else if (surname.trim() === '') {
      Alert.alert('Поле "Прізвище" не може бути порожнім');
    } else if (name.trim() === '') {
      Alert.alert('Поле "Ім’я" не може бути порожнім');
    } if (phone.trim() === '') {
      Alert.alert('Поле "Телефон" не може бути порожнім');
    } else if (birthday === '') {
      Alert.alert('Поле "Дата народження" не може бути порожнім');
    } else {
      const params = {
        email: email,
        password: password, 
        confirm_password: confirm_password, 
        surname: surname, 
        name: name, 
        patronymic: patronymic,
        city: city.trim(),
        phone: phone.trim(),
        birthday: birthday,
        device_id_token: fcmToken
      };
      
      setDisabled(true);
      signup(params).then((res) => {
        console.log(res);
        setDisabled(false);
        if (res.status != "error") {
          Alert.alert("Вітаємо", res.message);
          navigation.replace("SplashScreen");
        } else {
          Alert.alert("Помилка", res.message);
        }
      });
    }
  }

  return (
    <StepWrapper text="РЕЄСТРАЦІЯ КОРИСТУВАЧА" noProgress={true} step={1} navigation={navigation}>
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
        placeholder="Пароль"
        secureTextEntry={true}
        autoCompleteType="password"
        textContentType="newPassword"
        keyboardType="default"
        autoCapitalize="none"
        value={password}
        onChangeText={setPassword}
        icon={require('../../../icons/IconPasswordWhite50.png')}
        blurOnSubmit={false} // https://stackoverflow.com/questions/59038086/react-native-securetextentry-disable-ios-13-strong-password-behavior
        onSubmitEditing={() => Keyboard.dismiss()} // https://stackoverflow.com/questions/59038086/react-native-securetextentry-disable-ios-13-strong-password-behavior
      />
      <Input
        mask=""
        placeholder="Підтвердження пароля"
        secureTextEntry={true}
        autoCompleteType="password"
        textContentType="newPassword"
        keyboardType="default"
        autoCapitalize="none"
        value={confirm_password}
        onChangeText={setConfirm_password}
        icon={require('../../../icons/IconPasswordWhite50.png')}
        blurOnSubmit={false} // https://stackoverflow.com/questions/59038086/react-native-securetextentry-disable-ios-13-strong-password-behavior
        onSubmitEditing={() => Keyboard.dismiss()} // https://stackoverflow.com/questions/59038086/react-native-securetextentry-disable-ios-13-strong-password-behavior
      />
      <Input
        mask=""
        placeholder="Прізвище"
        autoCompleteType="off"
        textContentType="none"
        keyboardType="default"
        value={surname}
        onChangeText={setSurname}
        icon={require('../../../icons/IconNameWhite50.png')}
      />
      <Input
        mask=""
        placeholder="Ім’я"
        autoCompleteType="off"
        textContentType="none"
        keyboardType="default"
        value={name}
        onChangeText={setName}
        icon={require('../../../icons/IconNameWhite50.png')}
      />
      <Input
        mask=""
        placeholder="По батькові"
        autoCompleteType="off"
        textContentType="none"
        keyboardType="default"
        value={patronymic}
        onChangeText={setPatronymic}
        icon={require('../../../icons/IconNameWhite50.png')}
      />
      <Input
        mask=""
        placeholder="Місто проживання"
        autoCompleteType="street-address"
        textContentType="location"
        keyboardType="default"
        value={city}
        onChangeText={setCity}
        icon={require('../../../icons/IconLocationWhite50.png')}
        style={styles.input}
      />
      <Input
        mask="([000]) [000]-[00]-[00]"
        placeholder="Телефон"
        autoCompleteType="tel"
        textContentType="telephoneNumber"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
        icon={require('../../../icons/IconPhoneWhite50.png')}
        style={styles.input}
      />
      <DateInput
        placeholder="Дата народження"
        value={birthday}
        icon={require('../../../icons/IconCalendarWhite50.png')}
        style={styles.input}
        maximumDate={new Date()}
        onChange={(e, bday) => bday && setBirthday(bday)}
      />
      <Button style={styles.button} disabled={disabled} onPress={nextStep}>
        Готово
      </Button>
    </StepWrapper>
  );
});
