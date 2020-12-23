import React, {useState, useContext} from 'react';
import {StyleSheet, Alert} from 'react-native';

import StepWrapper from '../../../components/stepComponents/StepWrapper';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import TextRegular from '../../../components/TextRegular';
import {Context} from '../../../api';

const styles = StyleSheet.create({
  text: {
    width: '80%',
    marginTop: 30,
    color: '#ffffff',
    fontSize: 18,
    textAlign: 'center',
  },
  button: {
    marginTop: 40,
  },
});

export default React.memo(function ({navigation}) {
  const [disabled, setDisabled] = useState(false);

  const [email, setEmail] = useState('');

  const [token, {resetPassword}] = useContext(Context);

  const nextStep = () => {
    setDisabled(true);
    resetPassword({email}).then((res) => {
      (res.status === 'ok' ? navigateToSuccessStep : Alert.alert)(res.message);
      setDisabled(false);
    });
  };

  const navigateToSuccessStep = (text) =>
    navigation.reset({
      index: 1,
      routes: [
        {name: 'LoginFormScreen'},
        {
          name: 'SuccessStep',
          params: {text},
        },
      ],
    });

  return (
    <StepWrapper text="ЗАБУЛИ ПАРОЛЬ?" noProgress navigation={navigation}>
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
      <TextRegular style={styles.text}>
        На вказану електронну скриньку прийде лист з підтвердженням для
        створення нового пароля.
      </TextRegular>
      <Button style={styles.button} disabled={disabled} onPress={nextStep}>
        Підтвердити
      </Button>
    </StepWrapper>
  );
});
