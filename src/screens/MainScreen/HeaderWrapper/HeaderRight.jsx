import React, {useContext} from 'react';
import {TouchableOpacity, Image, StyleSheet} from 'react-native';

import IconLogout from '../../../icons/IconLogoutWhite100.png';

import {Context} from '../../../api';

const styles = StyleSheet.create({
  img: {height: 28, resizeMode: 'contain', margin: 10},
});

export default function ({navigation, children, ...props}) {
  const [token, {exit}] = useContext(Context);
  return (
    <TouchableOpacity onPress={exit} {...props}>
      <Image source={IconLogout} style={styles.img} />
    </TouchableOpacity>
  );
}
