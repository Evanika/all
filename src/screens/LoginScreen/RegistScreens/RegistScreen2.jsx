import React, {useState} from 'react';
import {StyleSheet, Alert} from 'react-native';

import StepWrapper from '../../../components/stepComponents/StepWrapper';
import Input from '../../../components/Input';
import Button from '../../../components/Button';

const styles = StyleSheet.create({
  button: {
    marginTop: 40,
  },
});

export default React.memo(function ({navigation, route}) {
  const [surname, setSurname] = useState('');
  const [name, setName] = useState('');
  const [patronymic, setPatronymic] = useState('');

  function nextStep() {
    if (surname.trim() === '') {
      Alert.alert('Поле "Прізвище" не може бути порожнім');
    } else if (name.trim() === '') {
      Alert.alert('Поле "Ім’я" не може бути порожнім');
    } else {
      navigation.navigate('RegistScreen3', {
        ...route.params,
        surname: surname.trim(),
        name: name.trim(),
        patronymic: patronymic.trim(),
      });
    }
  }

  return (
    <StepWrapper text="РЕЄСТРАЦІЯ КОРИСТУВАЧА" step={2} navigation={navigation}>
      <Input
        mask=""
        placeholder="Прізвище"
        autoCompleteType="name"
        textContentType="familyName"
        keyboardType="default"
        value={surname}
        onChangeText={setSurname}
        icon={require('../../../icons/IconNameWhite50.png')}
      />
      <Input
        mask=""
        placeholder="Ім’я"
        autoCompleteType="name"
        textContentType="givenName"
        keyboardType="default"
        value={name}
        onChangeText={setName}
        icon={require('../../../icons/IconNameWhite50.png')}
      />
      <Input
        mask=""
        placeholder="По батькові"
        autoCompleteType="name"
        textContentType="middleName"
        keyboardType="default"
        value={patronymic}
        onChangeText={setPatronymic}
        icon={require('../../../icons/IconNameWhite50.png')}
      />
      <Button style={styles.button} onPress={nextStep}>
        Наступний крок
      </Button>
    </StepWrapper>
  );
});
