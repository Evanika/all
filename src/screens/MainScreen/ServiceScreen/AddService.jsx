import React from 'react';
import {View, StyleSheet} from 'react-native';

import Button from '../../../components/Button';

const styles = StyleSheet.create({
  holder: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3be20',
    padding: 10,
  },
  btn: {
    width: '80%',
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
});

export default function ({navigation, style, ...props}) {
  return (
    <View style={[styles.holder, style]} {...props}>
      <Button
        style={styles.btn}
        onPress={() => navigation.navigate('NewServiceScreen')}
      >
        Зареєструвати сервіс
      </Button>
    </View>
  );
}
