import React, {useState, useEffect, useContext} from 'react';
import {View, SafeAreaView, Image, StyleSheet, Alert} from 'react-native';

import HeaderWrapper from '../HeaderWrapper/HeaderWrapper';

import TextSemiBold from '../../../components/TextSemiBold';

import IconName from '../../../icons/IconNameBlack50.png';
import IconMail from '../../../icons/IconMailBlack50.png';
import IconPhone from '../../../icons/IconPhoneBlack50.png';
import IconCalendar from '../../../icons/IconCalendarBlack50.png';
import IconAvatarPlaceholder from '../../../icons/IconAvatarPlaceholder.png';

import {Context} from '../../../api';

const styles = StyleSheet.create({
  bg: {flex: 1, backgroundColor: '#FBB700', alignItems: 'center'},
  title: {
    color: '#000000',
    margin: 25,
    fontSize: 28,
    fontFamily: global.fontSemiBold,
  },
  data: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 25,
  },
  input: {
    color: '#000000',
  },
  icons: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {width: 65, marginBottom: 25},
  avatar: {height: 70, width: 70, borderRadius: 35},
  infoHolder: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    minHeight: 60,
    marginTop: 12,
    borderRadius: 30,
    paddingRight: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  infoIcon: {
    width: 26,
    resizeMode: 'contain',
    marginLeft: 20,
    marginRight: 10,
  },
  infoText: {flex: 1},
});

const icons = {
  email: IconMail,
  name: IconName,
  surname: IconName,
  phone: IconPhone,
  birthday: IconCalendar,
  registration_date: IconCalendar,
  city: IconMail,
};

const Info = ({children, icon}) => (
  <View style={styles.infoHolder}>
    {icon && <Image source={icon} style={styles.infoIcon} />}
    <TextSemiBold style={styles.infoText}>{children}</TextSemiBold>
  </View>
);

export default React.memo(function ({navigation, ...props}) {
  const [{avatar, ...data}, setData] = useState(false);
  const [token, {getUserData}] = useContext(Context);

  useEffect(() => {
    getUserData({token})
      .then(({status, user_data, message, notification}) => {
        status === 'ok' ? setData(user_data) : Alert.alert(message);
        notification && Alert.alert('Повідомлення', notification);
      })
      .catch(console.log);
  }, []);
  return (
    <HeaderWrapper navigation={navigation} style={styles.wrapper}>
      <SafeAreaView style={styles.bg}>
        <TextSemiBold style={styles.title}>МІЙ ПРОФІЛЬ</TextSemiBold>
        <View style={styles.icons}>
          <Image
            source={avatar || IconAvatarPlaceholder}
            style={styles.avatar}
          />
        </View>
        <View style={styles.data}>
          {data &&
            Object.entries(data).map(
              ([key, val], i) =>
                Boolean(val) && (
                  <Info key={i} icon={icons[key]}>
                    {val}
                  </Info>
                ),
            )}
        </View>
      </SafeAreaView>
    </HeaderWrapper>
  );
});
