import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, Alert, View} from 'react-native';
import {getModel} from 'react-native-device-info';

import HeaderWrapper from '../HeaderWrapper/HeaderWrapper';
import StepWrapper from '../../../components/stepComponents/StepWrapper';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import PickerSelect from '../../../components/PickerSelect';
import DateInput from '../../../components/DateInput';

import {Context} from '../../../api';

const styles = StyleSheet.create({
  button: {
    marginTop: 40,
  },
});

export default React.memo(function ({navigation}) {
  const [disabled, setDisabled] = useState(false);

  const [stores, setStores] = useState([]);
  const [services, setServices] = useState([]);

  const [imei, setImei] = useState('');
  const [model, setModel] = useState(getModel());
  const [date_buy, setDate_buy] = useState('');
  const [store_id, setStore_id] = useState(null);
  const [service_id, setService_id] = useState(null);
  const [key_service, setKey_service] = useState('');

  const [token, {getStores, getServices, activation}] = useContext(Context);

  useEffect(() => {
    getStores().then((json) =>
      json.status === 'ok' ? setStores(json.stores) : Alert.alert(json.message),
    );
  }, [navigation]);

  useEffect(() => {
    getServices({store_id}).then((json) =>
      json.status === 'ok'
        ? setServices(json.services)
        : Alert.alert(json.message),
    );
  }, [store_id]);

  function nextStep() {
    if (model.trim() === '') {
      Alert.alert('Поле "Модель пристрою" не може бути порожнім');
    } if (imei.trim() === '') {
      Alert.alert('Поле "IMEI" не може бути порожнім');
    } else if (date_buy.trim() === '') {
      Alert.alert('Поле "Дата купівлі" не може бути порожнім');
    } /*else if (store_id === null) {
      Alert.alert('Поле "Магазин" не може бути порожнім');
    } else if (service_id === null) {
      Alert.alert('Поле "Полсуга" не може бути порожнім');
    }*/ else if (key_service.trim() === '') {
      Alert.alert('Поле "Ключ" не може бути порожнім');
    } else {
      const params = {
        imei: imei.trim(),
        model: model.trim(),
        date_buy,
        store_id,
        service_id,
        key_service: key_service.trim(),
      };

      setDisabled(true);
      activation(params).then((res) => {
        Alert.alert(res.message);
        setDisabled(false);
        res.status === 'ok' &&
          navigation.navigate('ServicesListScreen', {update: true});
      });
    }
  }

  return (
    <StepWrapper text="РЕЄСТРАЦІЯ СЕРВІСУ" noProgress navigation={navigation}>
      <Input
        mask=""
        placeholder="Модель пристрою"
        autoCompleteType="off"
        textContentType="none"
        keyboardType="default"
        value={model}
        onChangeText={setModel}
        icon={require('../../../icons/IconNameWhite50.png')}
      />
      <Input
        mask=""
        placeholder="IMEI / Серійний Номер"
        autoCompleteType="off"
        textContentType="none"
        keyboardType="default"
        value={imei}
        onChangeText={setImei}
        icon={require('../../../icons/IconNameWhite50.png')}
      />
      <DateInput
        placeholder="Дата купівлі"
        maximumDate={new Date()}
        value={date_buy}
        onChange={(event, date) => date && setDate_buy(date)}
        icon={require('../../../icons/IconCalendarWhite50.png')}
      />
      {/*<PickerSelect
        icon={require('../../../icons/IconLocationWhite50.png')}
        placeholder={{
          label: 'Магазин',
          value: null,
        }}
        items={Object.entries(stores).map(([key, val]) => ({
          label: val,
          value: key,
        }))}
        onValueChange={(v) => v && setStore_id(v)}
        value={store_id}
      />
      <PickerSelect
        icon={require('../../../icons/IconNameWhite50.png')}
        placeholder={{
          label:
            services.length === 0 ? 'Спочатку вибирайте магазин' : 'Полсуга',
          value: null,
        }}
        items={Object.entries(services).map(([key, val]) => ({
          label: val,
          value: key,
        }))}
        onValueChange={(v) => v && setService_id(v)}
        value={service_id}
        disabled={services.length === 0}
      />*/}
      <Input
        mask=""
        placeholder="Ключ"
        autoCompleteType="off"
        textContentType="none"
        keyboardType="default"
        value={key_service}
        onChangeText={setKey_service}
        icon={require('../../../icons/IconNameWhite50.png')}
      />
      <View style={{height: 100}}></View>
      <Button style={styles.button} disabled={disabled} onPress={nextStep}>
        Завершити
      </Button>
    </StepWrapper>
  );
});
