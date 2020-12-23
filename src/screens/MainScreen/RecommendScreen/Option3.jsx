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
          1. Для коректної роботи функції захисту телефону необхідно щоб телефон
          завжди мав з'єднання з Інтернетом.
        </TextMedium>
      </View>
      <View style={styles.view}>
        <TextMedium style={styles.text}>
          2. Для того щоб завжди мати можливість відстежити місце розташування
          телефону, необхідно щоб функція "Передача геоданих" була включена.
        </TextMedium>
      </View>
      <View style={styles.view}>
        <TextMedium style={styles.text}>
          3. Відкрийте настройки безпеки і перейдіть в розділ "Google Play
          Захист" і переконайтеся що включена функція "Перевіряти загрози
          безпеки".
        </TextMedium>
      </View>
      <View style={styles.view}>
        <TextMedium style={styles.text}>
          4. Відкрийте настройки безпеки і перейдіть в розділ "Знайти пристрій"
          і переконайтеся що статус функції "Включено". Якщо це не так, включіть
          її за допомогою перемикача в правому верхньому куті.
        </TextMedium>
      </View>
    </>
  );
}
