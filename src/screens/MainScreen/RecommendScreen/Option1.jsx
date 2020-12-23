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
});

export default function () {
  return (
    <>
      <View style={styles.view}>
        <TextMedium style={styles.text}>
          Google Play Захист – це пакет сервісів, які забезпечують безпеку
          пристроїв Android і допомагають стежити за збереженням даних. Вона
          регулярно оновлюється і автоматично виконує необхідні перевірки.
        </TextMedium>
      </View>
      <View style={styles.view}>
        <TextMedium style={styles.text}>
          Втратили телефон або планшет? Не хвилюйтесь! Вам допоможе сервіс
          "Знаsйти пристрій". Увійдіть в обліковий запис Google, щоб визначити,
          де знаходиться пристрій, заблокувати його, зателефонувати на нього з
          браузера або додати свою контактну інформацію на екран блокування. А
          якщо телефон втрачений безповоротно, видаліть з нього всі дані.
        </TextMedium>
      </View>
    </>
  );
}
