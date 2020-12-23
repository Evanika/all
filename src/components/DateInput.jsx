import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  StyleSheet,
  Platform,
  Button,
} from 'react-native';

import Input from './Input';

import DateTimePicker from '@react-native-community/datetimepicker';

const styles = StyleSheet.create({
  modalView: {flex: 1, justifyContent: 'flex-end'},
  modalBtnHolder: {
    width: '100%',
    alignItems: 'flex-end',
    padding: 5,
    backgroundColor: '#F0F0F0',
  },
  picker: {width: '100%', backgroundColor: 'rgba(210, 212, 218, 0.95)'},
});

export default function ({value, style, onChange, ...props}) {
  const [show, setShow] = useState(false);
  const [val, setVal] = useState('');
  const Picker = () => (
    <DateTimePicker
      value={
        value ? new Date(value.split('.').reverse().join('-')) : new Date()
      }
      mode={'date'}
      style={styles.picker}
      onChange={(event, date) => {
        Platform.OS !== 'ios' && setShow(!show);
        date =
          date && date.toJSON().substr(0, 10).split('-').reverse().join('.');
        onChange(event, date);
      }}
      {...props}
    />
  );

  return (
    <>
      <TouchableOpacity
        style={[styles.inputHolder, style]}
        onPress={() => setShow(!show)}
      >
        <Input mask="" onPress={() => console.log('test')} pointerEvents="none" editable={false} value={value} {...props} />
      </TouchableOpacity>
      {Platform.OS !== 'ios' ? (
        show && <Picker />
      ) : (
        <Modal
          onRequestClose={() => setShow(false)}
          animationType="slide"
          visible={show}
          transparent
          animated
        >
          <TouchableOpacity
            style={styles.modalView}
            activeOpacity={1}
            onPressOut={() => setShow(false)}
          >
            <TouchableWithoutFeedback>
              <View style={styles.modalBtnHolder}>
                <Button title="Готово" onPress={() => setShow(false)} />
              </View>
            </TouchableWithoutFeedback>
            <Picker />
          </TouchableOpacity>
        </Modal>
      )}
    </>
  );
}
