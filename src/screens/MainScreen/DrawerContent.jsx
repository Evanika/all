import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Linking,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import TextRegular from '../../components/TextRegular';
import TextSemiBold from '../../components/TextSemiBold';
import TextBold from '../../components/TextBold';

import IconNews from '../../icons/IconNewsWhite100.png';
import IconProfile from '../../icons/IconProfileWhite100.png';
import IconBookmarks from '../../icons/IconBookmarksWhite100.png';
import IconMail from '../../icons/IconMailWhite100.png';
import IconTelephone from '../../icons/IconTelephoneWhite100.png';
import IconOverview from '../../icons/IconOverviewWhite100.png';
import IconSettings from '../../icons/IconSettingsWhite100.png';
import IconWidgets from '../../icons/IconWidgetsWhite100.png';
import IconChannels from '../../icons/IconChannelsWhite100.png';
import IconAvatarPlaceholder from '../../icons/IconAvatarPlaceholder.png';

import IconLogo from '../../icons/IconSupportUa.png';
import {Context} from '../../api';
import AsyncStorage from '@react-native-community/async-storage';

const styles = StyleSheet.create({
  scrollView: {flex: 1, paddingTop: 15},
  BG: {flex: 1},
  safeView: {flex: 1},
  route: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  routeImg: {
    flex: 1,
    height: 24,
    resizeMode: 'contain',
    marginRight: 15,
  },
  routeText: {
    flex: 5,
    color: '#ffffff',
    letterSpacing: 1,
  },
  logo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#333A41',
  },
  logoImg: {
    height: 50,
    width: 50,
    backgroundColor: '#ffffff',
    borderRadius: 25,
    resizeMode: 'contain',
  },
  logoText: {
    fontSize: 25,
    color: 'rgba(255, 255, 255, 0.7)',
    marginLeft: 15,
  },
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
    borderTopWidth: 2,
    paddingTop: 15,
    paddingLeft: 30,
    paddingBottom: 5,
    paddingRight: 30,
  },
  profileExit: {
    fontSize: 20,
    color: '#ffffff',
  },
  profileName: {
    marginTop: 10,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  profileImg: {height: 50, width: 50, resizeMode: 'contain', borderRadius: 25},
});

export default React.memo(function ({state, navigation, ...props}) {
  const [{avatar, name, surname, email, phone,  ...data}, setData] = useState(false);
  const [token, {getUserData,getUserServices, exit}] = useContext(Context);
  const [routes, setRoutes] = useState([]);

  useEffect(() => {

    getUserData({token})
      .then(({status, user_data}) => {
        status === 'ok' && setData(user_data);
        AsyncStorage.setItem('name', user_data.name?user_data.name : ' ' );
        AsyncStorage.setItem('surname',user_data.surname? user_data.surname: ' ');
        AsyncStorage.setItem('email',user_data.email? user_data.email: ' ');
        AsyncStorage.setItem('phone',user_data.phone? user_data.phone: ' ');
        AsyncStorage.setItem('avatar',user_data.avatar? user_data.avatar: ' ');
      })
      .catch(console.log);

      getUserServices().then((json) => {
        console.log(json);
        console.log('TEST123');
        if (json.status === 'ok') {
          console.log('TEST');
          if (json.user_services.length > 0) {
            setRoutes([{title: 'МОЇ ПОСЛУГИ', src: IconNews, nav: 'ServiceScreen'},
            {title: 'МІЙ ПРОФІЛЬ', src: IconProfile, nav: 'ProfileScreen'},
            {title: 'РЕКОМЕНДАЦІЇ', src: IconBookmarks, nav: 'MainRecommendationScreen'},
            {title: 'ПОДЗВОНИТИ', src: IconTelephone, link: 'tel:0800305024'},
            {
              title: 'ЗАЛИШИТИ ВІДГУК',
              src: IconOverview,
                 
              link: 'https://g.page/supportua/review',
            },
            {
              title: 'ДОКУМЕНТАЦІЯ',
              src: IconChannels,
              link:
                'https://support.ua/dokymenty/',
            },,        {title: 'ОНЛАЙН-ЧАТ', src: IconMail, nav: 'ChatStack'},
            {
              title: 'TEAMVIEWER',
              src: IconSettings,
              link: 'https://get.teamviewer.com/support-ua',
            },
            // {title: 'SPEEDTEST', src: IconWidgets, link: ''},
            {title: 'SPEEDTEST', src: IconWidgets, nav: 'SpeedScreen'},])
          } else {
            setRoutes([{title: 'МОЇ ПОСЛУГИ', src: IconNews, nav: 'ServiceScreen'},
            {title: 'МІЙ ПРОФІЛЬ', src: IconProfile, nav: 'ProfileScreen'},
            {title: 'РЕКОМЕНДАЦІЇ', src: IconBookmarks, nav: 'MainRecommendationScreen'},
            {
              title: 'ЗАЛИШИТИ ВІДГУК',
              src: IconOverview,
                 
              link: 'https://g.page/supportua/review',
            },
            {
              title: 'ДОКУМЕНТАЦІЯ',
              src: IconChannels,
              link:
                'https://support.ua/dokymenty/',
            },,        {title: 'НАША ПIДТРИМКА', src: IconMail, nav: 'OurSupport'}])
          }
        }else {
          setRoutes([{title: 'МОЇ ПОСЛУГИ', src: IconNews, nav: 'ServiceScreen'},
          {title: 'МІЙ ПРОФІЛЬ', src: IconProfile, nav: 'ProfileScreen'},
          {title: 'РЕКОМЕНДАЦІЇ', src: IconBookmarks, nav: 'MainRecommendationScreen'},
          {
            title: 'ЗАЛИШИТИ ВІДГУК',
            src: IconOverview,
               
            link: 'https://g.page/supportua/review',
          },
          {
            title: 'ДОКУМЕНТАЦІЯ',
            src: IconChannels,
            link:
              'https://support.ua/dokymenty/',
          },,        {title: 'НАША ПIДТРИМКА', src: IconMail, nav: 'OurSupport'}])
        }
      }
    );

  }, []);

  const logout = () => {
    exit();
    navigation.replace("SplashScreen");
  }
  const Logo = React.memo(() => (
    <View style={styles.logo}>
      <Image source={IconLogo} style={styles.logoImg} />
      <TextSemiBold style={styles.logoText}>Support.ua</TextSemiBold>
    </View>
  ));
  
  const Profile = React.memo(() => (
    <View style={styles.profileContainer}>
      <View style={styles.profileText}>
        <TouchableOpacity onPress={logout}>
          <TextSemiBold style={styles.profileExit}>Вийти</TextSemiBold>
        </TouchableOpacity>
        <TextRegular style={styles.profileName}>
          {name} {surname}
        </TextRegular>
      </View>
      <Image
        source={avatar || IconAvatarPlaceholder}
        style={styles.profileImg}
      />
    </View>
  ));

  const Route = ({title, src, link, nav}) => (
    <TouchableOpacity
      style={styles.route}
      onPress={() => {
        link && Linking.openURL(link);
        nav && navigation.navigate(nav,{name:name, surname:surname, email:email, phone:phone, avatar: avatar});
      }}
    >
      {src && <Image source={src} style={styles.routeImg} />}
      <TextBold style={styles.routeText}>{title}</TextBold>
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={['#ffc107', '#000000']} style={styles.BG}>
      <SafeAreaView style={styles.safeView}>
        <Logo />
        <ScrollView contentContainerStyle={styles.scrollView}>
          {routes.map((props, i) => (
            <Route key={i} {...props} />
          ))}
        </ScrollView>
        <Profile />
      </SafeAreaView>
    </LinearGradient>
  );
});
