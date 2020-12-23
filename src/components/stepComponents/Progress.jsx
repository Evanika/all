import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

import dot from './media/Dot.png';
import line from './media/Line.png';
import ring from './media/Ring.png';

const styles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  dot: {
    height: 10,
    width: 10,
    margin: 40,
  },
  line: {
    flex: 1,
  },
  ringContainer: {position: 'absolute', flex: 1, width: '100%'},
  ring: {flex: 1, marginLeft: 20, marginRight: 20},
  step1: {alignSelf: 'flex-start'},
  step2: {alignSelf: 'center'},
  step3: {alignSelf: 'flex-end'},
});

const Dot = ({style, source, ...props}) => (
  <Image source={dot} style={[styles.dot, style]} {...props} />
);
const Line = ({style, source, ...props}) => (
  <Image source={line} style={[styles.line, style]} {...props} />
);
const Ring = ({style, source, ...props}) => (
  <Image source={ring} style={[styles.ring, style]} {...props} />
);

export default function ({step, style}) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.ringContainer}>
        <Ring style={styles['step' + step]} />
      </View>
      <Dot />
      <Line />
      <Dot />
      <Line />
      <Dot />
    </View>
  );
}
