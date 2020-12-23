import React from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';

import TextRegular from '../../../components/TextRegular';

import empty from './media/empty.png';

const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent:'center', height: height - 200},
  img: {
    resizeMode: 'center',
  },
  text: {
    margin: '5%',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
  },
});

export default function () {
  return (
    <View style={styles.container}>
      {/*<Image source={empty} style={styles.img} />*/}
      <TextRegular style={styles.text}>
        Ой! Схоже, Ви ще не додали жодної послуги. Виправимо це?
      </TextRegular>
    </View>
  );
}
