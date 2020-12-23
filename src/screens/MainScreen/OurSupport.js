import React, { useState, useEffect, useContext } from 'react';
import { Dimensions, StyleSheet, Linking, TouchableOpacity, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import HeaderWrapper from './HeaderWrapper/HeaderWrapper';
import Button from '../../components/Button';
import TextSemiBold from '../../components/TextSemiBold';
import { Context } from '../../api';
import Icon from "react-native-vector-icons/FontAwesome";

const styles = StyleSheet.create({
    holder: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f3be20',
      padding: 10,
    },
    btn: {
      width: '80%',
      borderWidth: 3,
      borderColor: 'rgba(255, 255, 255, 0.5)',
    },
    Btn: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '90%',
      height: 60,
      borderRadius: 30,
      overflow: 'hidden',
      borderStyle: 'solid',
      borderWidth: 2,
      borderColor: 'rgba(255, 255, 255, 0.3)',
      flexDirection:'row'
    },
    BtnYellow: {
      backgroundColor: '#ffc107',
      borderWidth: 0,
    },
    BtnText: {
      fontSize: 16,
      color: '#ffffff',
    },
    BtnTextYellow: {
      fontSize: 16,
      color: '#FFF',
    },
  });


export default React.memo(function ({ navigation, route: { params }, ...props }) {


    return (
       <HeaderWrapper navigation={navigation}>
           <View style={[styles.holder]}>
           <View
      style={[styles.Btn,styles.BtnYellow, styles.btn]}
    >
      <TextSemiBold
        style={[ styles.BtnTextYellow]}
      >
        Контакти
      </TextSemiBold>
      <View style={{marginLeft: 15}}>{props.disabled &&  <Bubbles size={5} color="#FFF" />}</View>
    </View>
    </View>
                <View style={{ alignItems: 'flex-start', justifyContent: 'flex-start', flexDirection: 'column', flex: 1}}>
                    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', marginTop: 20, marginLeft: 20}}>
                        <Icon name='envelope' size={20} ></Icon>
                        <Text style={{marginLeft: 5, fontSize: 20}}>Email:</Text>
                    </View>
                    <TouchableOpacity onPress={() => Linking.openURL('mailto:support@support.ua')} style={{ marginTop: 5, marginLeft: 20 }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#007AFF' }}>support@support.ua</Text>
                    </TouchableOpacity>
                    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', marginTop: 20, marginLeft: 20}}>
                        <Icon name='globe' size={20} ></Icon>
                        <Text style={{marginLeft: 5, fontSize: 20}}>Наш сайт:</Text>
                    </View>
                    <TouchableOpacity onPress={() => Linking.openURL('https://www.support.ua')} style={{ marginTop: 5, marginLeft: 20 }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#007AFF' }}>support.ua</Text>
                    </TouchableOpacity>
                </View>
        </HeaderWrapper>
    );
});
