import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';

import TextExtraBold from '../../../components/TextExtraBold';

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    color: '#f1f1f1',
    textAlign: 'center',
    margin: 10,
  },
});

export default React.memo(function ({navigation, ...props}) {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('ServicesListScreen')}
      {...props}
    >
      <TextExtraBold style={styles.text}>SUPPORT.UA</TextExtraBold>
    </TouchableOpacity>
  );
});
