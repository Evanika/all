import React from 'react';
import {SafeAreaView, Image, StatusBar, StyleSheet} from 'react-native';

import Button from '../Button';
import TextSemiBold from '../TextSemiBold';
import TextExtraBold from '../TextExtraBold';

import IconSearch from '../../icons/IconSearch.png';

const styles = StyleSheet.create({
  BG: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#22201e',
  },
  header: {
    color: '#ffffff',
    fontSize: 28,
    marginTop: 40,
  },
  img: {
    width: '60%',
    resizeMode: 'contain',
  },
  text: {
    width: '80%',
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
  },
  btn: {
    marginBottom: 40,
  },
});

export default React.memo(function ({
  navigation,
  route: {
    params: {text},
  },
  ...props
}) {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#22201e" />
      <SafeAreaView style={styles.BG}>
        <TextExtraBold style={styles.header}>УСПІХ!</TextExtraBold>
        <Image source={IconSearch} style={styles.img} />
        <TextSemiBold style={styles.text}>{text}</TextSemiBold>
        <Button style={styles.btn} onPress={() => navigation.goBack()}>
          Увійти в особистий кабінет
        </Button>
      </SafeAreaView>
    </>
  );
});
