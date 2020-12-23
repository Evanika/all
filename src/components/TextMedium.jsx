import React from 'react';
import {Text} from 'react-native';

export default function ({style, ...props}) {
  return <Text style={[style, {fontFamily: 'Montserrat-Medium'}]} {...props} />;
}
