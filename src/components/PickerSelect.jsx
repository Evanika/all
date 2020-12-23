import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

import PickerSelect from 'react-native-picker-select';

const styles = StyleSheet.create({
  pickerHolder: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    height: 60,
    marginTop: 12,
    borderRadius: 30,
    paddingRight: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  icon: {
    width: 26,
    resizeMode: 'contain',
    marginLeft: 20,
    marginRight: 10,
  },
});

const pickerStyleSheet = StyleSheet.create({
  viewContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  inputIOS: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
  },
  inputAndroid: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
  },
  placeholder: {
    color: 'rgba(255, 255, 255, 0.5)',
  },
});

export default React.memo(function ({icon, style, pickerStyle, ...props}) {
  props.placeholderTextColor =
    props.placeholderTextColor || 'rgba(255, 255, 255, 0.5)';
  return (
    <View style={[styles.pickerHolder, style]}>
      {icon && <Image source={icon} style={styles.icon} />}
      <PickerSelect style={{...pickerStyleSheet, ...pickerStyle}} {...props} />
    </View>
  );
});
