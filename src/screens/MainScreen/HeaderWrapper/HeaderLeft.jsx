import React from 'react';
import {TouchableOpacity, Image, StyleSheet} from 'react-native';

import IconMenu from '../../../icons/IconMenuWhite100.png';

const styles = StyleSheet.create({
  img: {height: 22, resizeMode: 'contain', margin: 10},
});

export default function ({navigation, children, ...props}) {
  return (
    <TouchableOpacity onPress={() => navigation.openDrawer()} {...props}>
      <Image source={IconMenu} style={styles.img} />
    </TouchableOpacity>
  );
}
