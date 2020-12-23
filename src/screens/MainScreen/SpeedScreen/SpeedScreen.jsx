import React, { useState, useContext, useEffect } from 'react'
import {
    SafeAreaView,
    StyleSheet,
    View,
    Alert,
    ScrollView,
    Text, 
    Dimensions, 
    PermissionsAndroid
} from 'react-native'
import HeaderWrapper from '../HeaderWrapper/HeaderWrapper';
import TextSemiBold from '../../../components/TextSemiBold';
import Button from '../../../components/Button';
import RNFetchBlob from 'react-native-fetch-blob';
import Ping from 'react-native-ping';
import { cos, min } from 'react-native-reanimated';
import RNSpeedometer from 'react-native-speedometer';
import Icon from "react-native-vector-icons/FontAwesome";
import { isValidElement } from 'react';
import {api} from '../../../api';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from "@react-native-community/netinfo";
import {Context} from '../../../api';

const width = Dimensions.get('window'). width;
const styles = StyleSheet.create({
    bg: {
        flex: 1,
        backgroundColor: '#f3be20',
        alignItems: 'center',
    },
    title: {
        color: '#000000',
        fontSize: 24,
        fontFamily: global.fontSemiBold,
        marginTop: 20
    },
    blockTitle: {
        color: '#000000',
        fontSize: 22,
        fontFamily: global.fontSemiBold,
        marginLeft: 10
    },
    btn: {
        width: '80%',
        borderWidth: 3,
        borderColor: 'rgba(255, 255, 255, 0.5)',
        marginTop: 50
    },
    speedContent: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'column',
        marginTop: 15

    },
    blockView: {
        flexDirection:'row',
        justifyContent: 'center',
        flex: 1
    },
    view1: {
        marginLeft: 10, 
        justifyContent:'flex-start'
    }
})


const  configureSpeed =  (speed) => {
    if (speed.indexOf('KB/s') > -1) {
        tmp = speed.split('KB/s').join('');
        tmp = tmp.split('MB/s').join('');
        tmp = tmp.split('B/s').join('');
        return (tmp * 8 * 0.001)
    }
    if (speed.indexOf('MB/s') > -1) {
        tmp = speed.split('KB/s').join('');
        tmp = tmp.split('MB/s').join('');
        tmp = tmp.split('B/s').join('');
        return (tmp * 8)
    }

    if (speed.indexOf('B/s') > -1) {
        tmp = speed.split('B/s').join('');
        tmp = tmp.split('B/s').join('');
        tmp = tmp.split('B/s').join('');
        return tmp * 8 * 0.00001;
    }
    

}
export default function ({navigation, ...props}) {

    const [speed, setSpeed] = useState(0);
    const [speedometer, setSpeedometer] = useState(0);
    const [upSpeedometer, setUpSpeedometer] = useState(0);
    const [upSpeed, setUpSpeed] = useState(0);
    const [ping, setPing] = useState(0);
    const [tests, SetTests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [upLoading, setUpLoading] = useState(false);
    const [network, setNetwork] = useState('wifi');
    const [dataUploaded, setDataUploaded] = useState(false);
    const [token, {getSpeedTests, setSpeedTest}] = useContext(Context);
    const screenWidth = Dimensions. get('window'). width;
    const [enabled, setEnabled] = useState(true);
    const [disabled, setDisabled] = useState(false);
    useEffect(() => {
        getSpeedTests().then((json) =>
        {
            json.status === 'ok' ? SetTests(json.speedtest_results) : Alert.alert(json.message)
        }
        );

        NetInfo.fetch().then(state => {
            setNetwork(state.type);
        });

        requestCameraPermission();
      }, [navigation]);

      const metric = 'MB/s';
    speedHandler = async() => {   
        
       
        setUpSpeed(0);
        setSpeed(0);
        setSpeedometer(0);
        setPing(0);
        setLoading(false);
        setUpLoading(false);
        setDataUploaded(false);
        setDisabled(true);

        await this.checkSpeed();

        
        RNFetchBlob
                .config({
                    fileCache: true,
                })
                .fetch('GET', 'https://my.support.ua/100MB.zip', {})
                .then((res) => {
                    const endTime = (new Date()).getTime();
                   // const duration = (endTime - startTime) / 1000;
                   // const speed = 1;
                    
                    setLoading(true);
                    setUpLoading(true);
                    setDisabled(false);
                    RNFetchBlob.fs.unlink(res.path());
                });
        
    }

    checkTest = async () => {
        console.log('test');
    }

    const requestCameraPermission = async () => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title: "Cool Photo App Camera Permission",
              message:
                "Cool Photo App needs access to your camera " +
                "so you can take awesome pictures.",
              buttonNeutral: "Ask Me Later",
              buttonNegative: "Cancel",
              buttonPositive: "OK"
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can use the camera");
          } else {
            console.log("Camera permission denied");
          }
        } catch (err) {
          console.warn(err);
        }
      };

    checkSpeed = async () => {

        if (!ping) {
            let ms = await Ping.start('8.8.8.8',{ timeout: 1000 });
            
            setPing(ms);
        }
        let traffics = await Ping.getTrafficStats();

        let speed = traffics.receivedNetworkSpeed;
        
        let upSpeed = traffics.sendNetworkSpeed;

        if (loading && upLoading) {
            
            if(!dataUploaded) {
                setDataUploaded(true);
                setSpeedTest({ping:ping, 'download_speed': speedometer, 'upload_speed': upSpeedometer, 'connection_type':network}).then((json) =>
                  {
                    console.log(json);
                    getSpeedTests().then((json) =>
                    {
                        json.status === 'ok' ? SetTests(json.speedtest_results) : Alert.alert(json.message)
                    }
                    );
                  }
                  );
                setEnabled(true);
            } else {
                speedHandler();
            }
            
            return;
        } else {
            setTimeout(async () => {
                await this.checkSpeed();
            }, 400);
        }
        
        var sp =  configureSpeed(speed);
        if (!loading) {
            if (sp >= speedometer) {
                sp = sp.toFixed(2);
                setSpeedometer(sp);
                setSpeed(sp + ' Мбит/с');
            } else {
            }
        }
        var sp2 =  configureSpeed(upSpeed);
        if (sp2 > upSpeedometer) {
            sp2 = sp2.toFixed(2)
            setUpSpeedometer(sp2);
            setUpSpeed(sp2 + ' Мбит/с');
         }

    }


    const configureSpeed =  (speed) => {
        if (speed.indexOf('KB/s') > -1) {
            tmp = speed.split('KB/s').join('');
            tmp = tmp.split('MB/s').join('');
            tmp = tmp.split('B/s').join('');
            tmp = tmp.split(',').join('.');
            return (tmp * 8 * 0.001)
        }
        if (speed.indexOf('MB/s') > -1) {
            tmp = speed.split('KB/s').join('');
            tmp = tmp.split('MB/s').join('');
            tmp = tmp.split('B/s').join('');
            tmp = tmp.split(',').join('.');
            return (tmp * 8)
        }

        if (speed.indexOf('B/s') > -1) {
            tmp = speed.split('B/s').join('');
            tmp = tmp.split('B/s').join('');
            tmp = tmp.split('B/s').join('');
            tmp = tmp.split(',').join('.');
            return tmp * 8 * 0.00001;
        }
        

    }


    return (
        <HeaderWrapper navigation={navigation} style={styles.wrapper}>
            <SafeAreaView style={styles.bg}>
                <TextSemiBold style={styles.title}>SPEED TEST</TextSemiBold>
                <View style={styles.speedContent}>
                    <TextSemiBold style={styles.title}></TextSemiBold>
                        
                        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', marginBottom: 30}}>
                            <View style={[styles.blockView, styles.view1]}>
                                <Icon name="download" size={25} />
                                <TextSemiBold style={styles.blockTitle}>{speed ? speed : "0"}</TextSemiBold>
                            </View>
                            <View style={styles.blockView}>
                                <TextSemiBold style={styles.blockTitle}>Ping: </TextSemiBold>
                                <TextSemiBold style={styles.blockTitle}>{ping ? ping : "0"} мс</TextSemiBold>
                            </View>
                         </View>
                        {
                            <RNSpeedometer value={speedometer} size={width - 150}  labelWrapperStyle={{ height: 0, width: 0}}/>

                        } 
                        
                    <Button style={styles.btn} disabled={disabled} onPress={speedHandler}>Перевірити швидкість</Button>

                    <ScrollView style={{marginTop: 0}}>
                        <View style={{height:50, borderBottomColor:'#FFF',borderBottomWidth: 2,  width: width, flexDirection:'row'}}>
                            <View style={{flexDirection:'row', flex: 0.5, alignItems:'center', justifyContent:'center'}}>
                                <Text>Тип</Text>
                            </View>
                            <View style={{flexDirection:'row', flex: 1, alignItems:'center', justifyContent:'center'}}>
                                <Text>Дата</Text>
                            </View>
                            <View style={{flexDirection:'row', flex: 1, alignItems:'center', justifyContent:'center'}}>
                                <Icon name="download" size={18}/>
                                <Text> Мбит/с</Text>
                            </View>
                     </View>
                     {tests.length > 0 && tests.map(test => {
                         return (<View key={test.date_test} style={{height:50, borderBottomColor:'#FFF',borderBottomWidth: 2,  width: width, flexDirection:'row'}}>
                            <View style={{flexDirection:'row', flex: 0.5, alignItems:'center', justifyContent:'center'}}>
                                <Icon name={test.connection_type != 'wifi'?"mobile":"wifi"} size={18}/>
                            </View>
                            <View style={{flexDirection:'row', flex: 1, alignItems:'center', justifyContent:'center'}}>
                                <Text style={{textAlign:'center'}}>{test.date_test}</Text>
                            </View>
                            <View style={{flexDirection:'row', flex: 1, alignItems:'center', justifyContent:'center'}}>
                                <Text style={{textAlign:'center'}}>{test.download_speed}</Text>
                            </View>
                         </View>)
                     })}
                    </ScrollView>
                </View>
            </SafeAreaView>
        </HeaderWrapper>
    )
}