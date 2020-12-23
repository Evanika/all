import React from 'react';
import {View, TextInput, Image, StyleSheet} from 'react-native';
import TextInputMask from 'react-native-text-input-mask';

const styles = StyleSheet.create({
  inputHolder: {
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
  input: {
    flex: 1,
    height: '100%',
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
  },
});

export default React.memo(function ({icon, style, inputStyle, mask, ...props}) {
  props.placeholderTextColor =
    props.placeholderTextColor || 'rgba(255, 255, 255, 0.5)';
  return (
    <View style={[styles.inputHolder, style]}>
      {icon && <Image source={icon} style={styles.icon} />} 
      {mask == ''?  <TextInput  style={[styles.input, inputStyle]} {...props}/>:
        <TextInputMask  style={[styles.input, inputStyle]} {...props} mask={mask} />
      }
    </View>
  );
});
