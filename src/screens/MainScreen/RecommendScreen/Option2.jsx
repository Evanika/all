import React from 'react';
import {View, StyleSheet} from 'react-native';

import TextMedium from '../../../components/TextMedium';

const styles = StyleSheet.create({
  view: {
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
    borderBottomWidth: 2,
  },
  text: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 25,
    paddingRight: 25,
    fontSize: 14,
    lineHeight: 24,
  },
  list: {
    fontSize: 18,
  },
});

export default function () {
  return (
    <>
      <View style={styles.view}>
        <TextMedium style={styles.text}>
          Використання системи безпеки надає користувачеві незліченний набір
          можливостей, що дозволять не лише забезпечити коректні дії при втраті
          мобільного телефону, проте також гарантуватимуть безпеку
          користувацьких даних.
        </TextMedium>
      </View>
      <View style={styles.view}>
        <TextMedium style={[styles.text, styles.list]}>
          {'• “Продзвонити” телефон\n\n' +
            '• Заблокувати пристрій\n\n' +
            '• Видалити дані\n\n' +
            '• Сканувати телефон на наявність вірусів'}
        </TextMedium>
      </View>
    </>
  );
}
