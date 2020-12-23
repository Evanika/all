import React from 'react';
import {
  View,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Platform,
  useWindowDimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import TextSemiBold from '../TextSemiBold';
import Progress from './Progress';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  BG: {
    position: 'absolute',
    width: '100%',
  },
  scroll: {
    width: '100%',
    alignItems: 'center',
    flexGrow: 1,
    paddingBottom: 40,
  },
  progress: {flex: 1},
  textWrapper: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  text: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 24,
  },
});

export default React.memo(function ({
  step,
  children,
  text,
  noProgress,
  ...props
}) {
  const {width, height} = useWindowDimensions();

  return (
    <>
      <LinearGradient
        style={[styles.BG, {height}]}
        colors={['#ffc107', '#000000']}
      />
      <Image source={require('./media/bg.png')} style={[styles.BG, {height}]} />
      <KeyboardAvoidingView
        behavior={'padding'}
        enabled={Platform.OS === 'ios'}
        style={styles.container}
      >
        <SafeAreaView style={styles.container}>
          <ScrollView
            contentContainerStyle={styles.scroll}
            keyboardShouldPersistTaps={'handled'}
          >
            {!noProgress && <Progress step={step} style={styles.progress} />}
            <View style={{marginTop: !noProgress? width > 400? 0: Platform.OS == 'android'? 10:8 : 40, marginBottom: !noProgress? 0: 10, flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <TextSemiBold style={styles.text}>{text}</TextSemiBold>
            </View>
            {children}
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </>
  );
});
