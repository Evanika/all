import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

import TextBold from '../../../components/TextBold';
import TextSemiBold from '../../../components/TextSemiBold';
import TextRegular from '../../../components/TextRegular';

import IconTime from '../../../icons/IconTimeBlack30.png';

const uriBase = 'https://my.support.ua/images/services/';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
    borderBottomWidth: 2,
  },
  header: {fontSize: 18, textAlign: 'center'},
  content: {
    marginTop: 20,
    flexDirection: 'row',
  },
  img: {flex: 1, resizeMode: 'contain'},
  info: {flex: 1, marginLeft: 10, marginTop: 20, marginBottom: 20},
  infoText: {fontSize: 12, lineHeight: 24},
  line: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
    flexWrap: 'wrap',
  },
  status: {marginTop: 20, justifyContent: 'space-between'},
  statusIcon: {width: 18, marginRight: 10, resizeMode: 'contain'},
  statusText: {textDecorationLine: 'underline'},
});

export default function ({
  service_name,
  key_service,
  img,
  model,
  imei,
  store_name,
  date_buy,
  service_duration,
  status,
  ...props
}) {
  const uri = uriBase + img;

  const lines = [
    ['№ Сервісу: ', key_service],
    ['Пристрій: ', model],
    ['IMEI / SN: ', imei],
    ['Магазин: ', store_name],
    ['Дата покупки: ', date_buy],
  ];
  return (
    <View style={styles.container}>
      <TextBold style={styles.header}>{service_name}</TextBold>
      <View style={styles.content}>
        {img && <Image source={{uri}} style={styles.img} />}
        <View style={styles.info}>
          {lines.map((text, i) => (
            <View key={i} style={styles.line}>
              <TextSemiBold style={styles.infoText}>{text[0]}</TextSemiBold>
              <TextRegular style={styles.infoText}>{text[1]}</TextRegular>
            </View>
          ))}
          <View style={styles.line}>
            <Image source={IconTime} style={styles.statusIcon} />
            <TextRegular style={styles.infoText}>
              {service_duration} місяців
            </TextRegular>
          </View>
          <TextSemiBold style={[styles.infoText, styles.statusText]}>
            {status === '1' ? 'АКТИВОВАНА' : 'НЕ АКТИВОВАНА'}
          </TextSemiBold>
        </View>
      </View>
    </View>
  );
}
