import React, {useState, useContext, useEffect} from 'react';
import {StyleSheet, Alert} from 'react-native';

import StepWrapper from '../../../components/stepComponents/StepWrapper';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import DateInput from '../../../components/DateInput';
import {Context} from '../../../api';

const styles = StyleSheet.create({
  button: {
    marginTop: 40,
  },
});

export default React.memo(function ({navigation, route}) {
  const [token, {signup}] = useContext(Context);

  const [disabled, setDisabled] = useState(false);

  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [birthday, setBirthday] = useState('');
  const [fcmToken, setFcmToken] = useState('');

  useEffect( () => {
    AsyncStorage.getItem('fcmToken').then(
      (device_id_token) => {
        if (device_id_token) {
          setFcmToken(device_id_token);
        } 
    });
  }, [])
  function nextStep() {
    if (phone.trim() === '') {
      Alert.alert('Поле "Телефон" не може бути порожнім');
    } else if (birthday === '') {
      Alert.alert('Поле "Дата народження" не може бути порожнім');
    } else {
      const params = {
        ...route.params,
        city: city.trim(),
        phone: phone.trim(),
        birthday: birthday,
        device_id_token: fcmToken
      };
      
      setDisabled(true);
      signup(params).then((res) => {
        console.log(res);
        Alert.alert(res.message);
        setDisabled(false);
        if (res.status != "error") {
          navigation.replace("SplashScreen");
        }
      });
    }
  }

  return (
    <StepWrapper text="РЕЄСТРАЦІЯ КОРИСТУВАЧА" step={3} navigation={navigation}>
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
      <Button disabled={disabled} onPress={nextStep} style={styles.button}>
        Готово
      </Button>
    </StepWrapper>
  );
});
