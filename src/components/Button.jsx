import React from 'react';
import {TouchableOpacity, StyleSheet, View} from 'react-native';
import TextSemiBold from './TextSemiBold';
import { Bubbles} from 'react-native-loader';

const styles = StyleSheet.create({
  Btn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    flexDirection:'row'
  },
  BtnYellow: {
    backgroundColor: '#ffc107',
    borderWidth: 0,
  },
  BtnText: {
    fontSize: 16,
    color: '#ffffff',
  },
  BtnTextYellow: {
    fontSize: 16,
    color: '#000000',
  },
});

export default function ({
  yellow,
  children,
  onPress,
  style,
  textStyle,
  ...props
}) {
  return (
    <TouchableOpacity
      style={[styles.Btn, yellow && styles.BtnYellow, style]}
      onPress={onPress}
      {...props}
    >
      <TextSemiBold
        style={[yellow ? styles.BtnTextYellow : styles.BtnText, textStyle]}
      >
        {children}
      </TextSemiBold>
      <View style={{marginLeft: 15}}>{props.disabled &&  <Bubbles size={5} color="#FFF" />}</View>
    </TouchableOpacity>
  );
}
