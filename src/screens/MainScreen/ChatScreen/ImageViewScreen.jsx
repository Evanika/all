import React, { useState, useEffect } from 'react'
import {
    SafeAreaView,
    StyleSheet,
    View,
    Alert,
    Platform,
    AppState,
    PermissionsAndroid
} from 'react-native'
import { Image, Dimensions } from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import HeaderWrapper from '../HeaderWrapper/HeaderWrapper';
import { HeaderBackButton } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/FontAwesome";
import { TouchableOpacity } from 'react-native-gesture-handler';
import CameraRoll from "@react-native-community/cameraroll";
import RNFetchBlob from 'react-native-fetch-blob';

const styles = StyleSheet.create({
    bg: {
        flex: 1,
        backgroundColor: '#f3be20',
        alignItems: 'center',
    },
    title: {
        color: '#000000',
        margin: 25,
        fontSize: 28,
        fontFamily: global.fontSemiBold,
    },
    btn: {
        width: '80%',
        borderWidth: 3,
        borderColor: 'rgba(255, 255, 255, 0.5)',
    },
    speedContent: {
        flex: .7,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'

    }
})


export default class ChatScreen extends React.Component {
     
    constructor(props){
        super(props);
        this.state = { messages: [], userToken: ''};
    
    }

    async componentDidMount() {
        console.log('****');
        console.log(this.props.route);
    }

    async hasAndroidPermission() {
        const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
      
        const hasPermission = await PermissionsAndroid.check(permission);
        if (hasPermission) {
          return true;
        }
    }

    getExtention = (filename) => {
        return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) :
          undefined;
      }

    async savePicture() {
        if (Platform.OS === "android" && !(await this.hasAndroidPermission())) {
          return;
        }
        console.log(this.props.route.params.image);
        if (Platform.OS == 'android') {
            var date = new Date();
    var image_URL = this.props.route.params.image;
    var ext = this.getExtention(image_URL);
    ext = "." + ext[0];
    const { config, fs } = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path: PictureDir + "/image_" + Math.floor(date.getTime()
          + date.getSeconds() / 2) + ext,
        description: 'Image'
      }
    }
    config(options).fetch('GET', image_URL).then((res) => {
      Alert.alert("Фото збережено");
    });
        } else {
            CameraRoll.save(this.props.route.params.image, {type:'photo'}).then((r) => {
                console.log(r);
                Alert.alert('Фото збережено');
            });   
        }
      };

  render()    {
     return (
      <HeaderWrapper navigation={this.props.navigation} style={styles.wrapper}>
          <View style={{width: Dimensions.get('screen').width, flexDirection: 'row', alignItems:'center'}}>
          <HeaderBackButton  tintColor="#FBBF00" labelVisible={false}  onPress={_ => this.props.navigation.goBack()}/> 
          <View style={{position:'absolute', right: 15, alignSelf:'center'}}>
            <TouchableOpacity  onPress={() => this.savePicture()}>
            <Icon  name="save" size={30} color="#FBBF00" ></Icon>
          </TouchableOpacity>
          </View>
          </View>
            <ImageZoom cropWidth={Dimensions.get('window').width}
                       cropHeight={Dimensions.get('window').height}
                       imageWidth={Dimensions.get('window').width}
                       imageHeight={Dimensions.get('window').height}>
                <Image resizeMode='center' style={{width: Dimensions.get('window').width, height:Dimensions.get('window').height - 200}}
                       source={{uri:this.props.route.params.image}}/>
            </ImageZoom>
        </HeaderWrapper>
    )};
}



