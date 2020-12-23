import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import LoginForm from './LoginForm';

const styles = StyleSheet.create({
  BG: {
    position: 'absolute',
    width: '100%',
  },
  container: {flex: 1},
  scroll: {
    width: '100%',
    alignItems: 'center',
    flexGrow: 1,
    marginBottom: 10,
  },
  logo: {
    flex: 1,
    width: '60%',
    resizeMode: 'contain',
  },
});

export default React.memo(function ({navigation}) {
  const {width, height} = useWindowDimensions();

  return (
    <KeyboardAvoidingView
      behavior={'padding'}
      enabled={Platform.OS === 'ios'}
      style={styles.container}
    >
      <LinearGradient
        style={[styles.BG, {height}]}
        colors={['#ffc107', '#000000']}
      />
      <Image source={require('./media/bg.png')} style={[styles.BG, {height}]} />
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps={'handled'}
        >
          <Image source={require('./media/logo.png')} style={styles.logo} />
          <LoginForm navigation={navigation} />
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
});
