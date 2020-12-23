import React from 'react';
import {View, SafeAreaView, StatusBar, StyleSheet} from 'react-native';

import HeaderTitle from './HeaderTitle';
import HeaderLeft from './HeaderLeft';
import HeaderRight from './HeaderRight';

const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#22201e',
  },
  hide: {
    height: 0,
    overflow: 'hidden',
  },
});

export default React.memo(function ({children, navigation, ...props}) {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#22201e" />
      <SafeAreaView style={styles.header}>
        <HeaderLeft navigation={navigation} />
        <HeaderTitle navigation={navigation} />
        <HeaderRight navigation={navigation} style={styles.hide} />
      </SafeAreaView>
      {children}
    </>
  );
});
