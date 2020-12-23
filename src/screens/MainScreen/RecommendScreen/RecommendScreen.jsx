import React, {useState, useRef, useContext, useEffect} from 'react';
import {View, ScrollView, StyleSheet, useWindowDimensions, Image, Dimensions, ActivityIndicator, Text} from 'react-native';

import Button from '../../../components/Button';
import TextBold from '../../../components/TextBold';
import {Context} from '../../../api';
import HeaderWrapper from '../HeaderWrapper/HeaderWrapper';
import { TouchableOpacity } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  top: {backgroundColor: '#FBBF00'},
  title: {textAlign: 'center', fontSize: 16, margin: 25},
  buttons: {
    width: '100%',
    padding: 10,
    marginBottom: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {flex: 1, height: 40, borderColor: 'rgba(255, 255, 255, 0)'},
  buttonText: {fontSize: 10, color: 'rgba(255, 255, 255, 0.5)'},
  selectedButton: {borderColor: 'rgba(255, 255, 255, 0.3)'},
  selectedButtonText: {color: '#ffffff'},
  tab: {flex: 1},
});



export default function ({navigation, ...props}) {
  const carousel = useRef(null);
  const {width, height} = useWindowDimensions();
  const [recomendations, setRecomendations] = useState([]);

  const [token, {getRecomendations}] = useContext(Context);
  const screenWidth = Dimensions. get('window'). width;

  useEffect(() => {
    getRecomendations().then((json) =>
    {
      console.log(json);
      json.status === 'ok' ? setRecomendations(json.recommendations) : Alert.alert(json.message)
    }
    );
  }, [navigation]);

  return (
    <HeaderWrapper navigation={navigation}>
      <View style={styles.top}>
        <TextBold style={styles.title}>
          РЕКОМЕНДАЦІЇ НАЛАШТУВАННЯ БЕЗПЕКИ ВІД СПЕЦІАЛІСТІВ SUPPORT.UA
        </TextBold>
      </View>
      <ScrollView>
      {recomendations?recomendations.map(recomendation => {
          return (
            <TouchableOpacity onPress={() => navigation.navigate('RecommendationScreen', {'article' : recomendation})} style={{marginTop: 15, marginBottom: 15,  backgroundColor:'#FFF', borderTopWidth: 5, borderTopColor:'#FBBF00', borderRadius: 5, width:'90%', alignSelf:'center'}}>
              <Image style={{marginTop: 15, width: '100%', height: screenWidth*0.9 * (9 / 16) - 50}} source={{uri:'https://my.support.ua/images/recommendations/' + recomendation.img}}></Image>
              <Text style={{marginLeft: 15, marginRight: 15, marginTop: 5, marginBottom: 10, fontSize: 16, fontWeight:'600'}}>{recomendation.title}</Text>
              <Text style={{marginLeft: 15, marginRight: 15, marginBottom: 15, fontSize: 12}}>{recomendation.short_description}</Text>
            </TouchableOpacity>
          )
        }): <ActivityIndicator color='#FBBF00'></ActivityIndicator>}
      </ScrollView>
    </HeaderWrapper>
  );
}
