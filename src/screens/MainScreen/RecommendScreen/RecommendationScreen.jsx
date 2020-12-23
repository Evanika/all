import React, {useState, useRef, useContext, useEffect} from 'react';
import { ScrollView, Dimensions, View, StyleSheet, Image, Text, Alert } from "react-native";
import HTML from "react-native-render-html";
import {Context} from '../../../api';
import HeaderWrapper from '../HeaderWrapper/HeaderWrapper';
import Icon from "react-native-vector-icons/FontAwesome";
import { HeaderBackButton } from "@react-navigation/stack";

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
  const [recomendation, setRecomendation] = useState('');

  const [token, {getRecomendation}] = useContext(Context);
  const screenWidth = Dimensions. get('window'). width;
  
  
  useEffect(() => {
    getRecomendation({'alias': props.route.params.article.alias}).then((json) =>
    {
      json.status === 'ok' ? setRecomendation(json.recommendation) : Alert.alert(json.message)
    }
    );
  }, [navigation]);

  return (
    <HeaderWrapper navigation={navigation}>
      <View style={styles.top}>
      </View>
      <ScrollView>
      <View style={{marginTop: 15, marginBottom: 15,  backgroundColor:'#FFF', borderTopWidth: 5, borderTopColor:'#FBBF00', borderRadius: 5, width:'90%', alignSelf:'center'}}>
             <HeaderBackButton tintColor="#FBBF00" labelVisible={false}  onPress={_ => navigation.goBack()}/>
            <Image style={{marginTop: 15, width: '100%', height: screenWidth*0.9 * (9 / 16) - 50}} source={{uri:'https://my.support.ua/images/recommendations/' + props.route.params.article.img}}></Image>
              <Text style={{marginLeft: 15, marginRight: 15, marginTop: 5, marginBottom: 10, fontSize: 18, fontWeight:'600'}}>{props.route.params.article.title}</Text>
              <Text style={{marginLeft: 15, marginRight: 15, fontSize: 12}}>{props.route.params.article.short_description}</Text>
              <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
              <View style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-start', flex: 1, marginLeft: 5}}>
                <Icon name="calendar" size={18}/>
                <Text style={{marginLeft: 5}}>{props.route.params.article.date_of_publication}</Text>
              </View>
              <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', flex: 1}}>
                <Icon name="user" size={18} />
                <Text style={{marginLeft: 5}}>{props.route.params.article.author}</Text>
              </View>
              <View style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-end', flex: 1, marginRight: 5}}>
                <Icon name="eye" size={18} />
                <Text style={{marginLeft: 5}}>{props.route.params.article.views}</Text>
              </View>

              </View>
              <View style={{height: 1, width:'100%', backgroundColor:'#bcbcbc', marginTop: 5}}></View>
              <View style={{marginLeft: 15, marginRight: 15}}>
              <HTML
          html={recomendation?recomendation.article: ''}
          imagesMaxWidth={Dimensions.get("window").width}
        />
        </View>
      </View>
      </ScrollView>
    </HeaderWrapper>
  );
}
