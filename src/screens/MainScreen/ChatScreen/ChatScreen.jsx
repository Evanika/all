import React, { useState, useEffect } from 'react'
import {
    SafeAreaView,
    StyleSheet,
    View,
    Alert,
    Platform,
    AppState,
    Linking
} from 'react-native'
import AwesomeChat from 'react-native-awesome-chat';
import HeaderWrapper from '../HeaderWrapper/HeaderWrapper';
import TextSemiBold from '../../../components/TextSemiBold';
import Button from '../../../components/Button';
import RNFetchBlob from 'react-native-fetch-blob';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage';
import { useIsFocused } from '@react-navigation/native';
import moment from 'moment';


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



class ChatScreen extends React.Component {
     
    constructor(props){
        super(props);
        this.state = { messages: [], userToken: '', name: '', surname: '', email: '', avatar: '', phone: ''};
    
    }

    async componentDidMount() {
       // console.log('****');
       // console.log(this.props.route);

        let name = await AsyncStorage.getItem('name');
        let surname = await AsyncStorage.getItem('surname');
        let email = await AsyncStorage.getItem('email');
        let phone = await AsyncStorage.getItem('phone');
        let avatar = await AsyncStorage.getItem('avatar');

        this.setState({name: name, surname: surname, email: email, phone:phone, avatar: avatar})

        AppState.addEventListener("change", async (state) => {
            if (state == 'active') {
                await this.getChat()
            }
        });

        let token = await AsyncStorage.getItem('userToken');
        this.setState({userToken: token});

        AsyncStorage.setItem('launch_time_chat', JSON.stringify(new Date().getTime()));
        await this.getChat();

        /*if (chat != null) {
             this.setState({messages:chat});
        } else {
            this.setState({messages: [{body : "Вітаю! Я можу Вам чимось допомогти?", id : 1,
            timestamp : new Date().getTime(), type : "received", image_uri : ""}]});

        }*/

        messaging().onMessage(async (remoteMsg) => {

            console.warn('[FCMService] new FCM message arrived!!', remoteMsg);
            if (remoteMsg) {
               let notification = null;
               if (Platform.OS === 'ios') {
                 notification = remoteMsg.notification.title;
               } else {
                  notification = remoteMsg.notification.title;
               }
               
               this.getChat();
    
                
            }
          });

          setInterval(() => {
              this.getChat();
          }, 1000);
          
    }

    _handleAppStateChange = (nextAppState) => {
        console.log("App has come to the foreground!");
      };

    async componentDidUpdate(prevProps) {
        if (prevProps.isFocused !== this.props.isFocused) {
            if (this.props.isFocused) {
                 await this.getChat()
                
            }
         }
    }

    async componentWillUnmount () {
        clearInterval();
    }

    openImage(message) {
       // console.log('test');
        var matches = message.body.match(/\bhttps?:\/\/\S+/gi);

        if (matches!= null && matches.length > 0) {
            Linking.openURL(matches[0]);
            return;
        }
        
        if (message.image_uri) {
          //  console.log(message.image_uri)
            this.props.navigation.navigate('ImageViewScreen', {image: message.image_uri});
        }
    }
    getChat = async () => {
        console.log('GET CHAT');
        await fetch('https://my.support.ua/mobile-api/jivochat-history?api_key=55d41bafc7d483d86d31c9c7d3e6cfea', {
            method: 'POST',
            body: JSON.stringify({sender:{id: this.state.userToken}})
        }).then(response => response.json()).then(responseJson => {
         //   console.log(responseJson);
            let messages = responseJson.messages;
            
         //   console.log(messages);
            
            let obj =  Object.keys(messages);

            var mess = [];
            

            obj.forEach(message => {
                //console.log(message);
                //console.log(messages[message]);
                let date = moment(messages[message].time, "YYYY-MM-DD hh:mm:ss").unix();
                //console.log({body:messages[message].text, id: messages[message].id, timestamp:date, type: messages[message].incoming == 0? "received" : "sent", image_uri: ""});

                if (messages[message].file != null) {
                   // console.log(messages[message].file);
                  // console.log(messages[message]);
                   var tmpMsg = messages[message].text;
                   if (messages[message].type == 'breakpoint') {
                        tmpMsg = messages[message].sender_invite
                   }
                    mess.push({body:tmpMsg, id: messages[message].id, timestamp:date, type: messages[message].incoming == 0? "received" : "sent", image_uri: messages[message].file});
                } else {
                    console.log(messages[message]);
                    if (messages[message].type == 'breakpoint')
                    mess.push({body:messages[message].text, id: messages[message].id, timestamp:date, type: messages[message].incoming == 0? "received" : "sent", image_uri: ""});
                }
            });

            
            this.setState({messages: mess});
        });
    }

    sendMessage = async (message) => {

       // console.log(message);
        var msg = message;
        msg.timestamp = moment().unix();
        if (msg.image_uri  == null || msg.image_uri == undefined || msg.image_uri == '') {
            this.setState({messages:[...this.state.messages, msg]}, () => {
           });
        }
         //   this.setState({messages:[...this.state.messages, msg]}, () => {
         //   });
         var name = this.state.name;
         name += + this.state.surname? this.state.surname : ''
        
         
          if (message.image_uri != '') {
             // console.log(message);
            let body = new FormData();
            body.append('photo', {uri: message.image_uri,name: 'photo.jpg', type: Platform.OS == 'ios'?  'image/jpg' : 'image/jpeg'});
           // body.append('Content-Type', 'image/jpg');
            body.append('name', 'photo');
            await fetch('https://my.support.ua/mobile-api/jivochat-add-image?upload=1&api_key=55d41bafc7d483d86d31c9c7d3e6cfea', {
                method: 'POST',
                body: body
            }).then(response => response.json()).then(responseJson => {
                console.log(responseJson);
                console.log('&&&&&&');
               // console.log(responseJson.file);  
                let object = {
                    "sender" :
                    {
                          "id" : this.state.userToken,
                       "name"  : name,
                       "photo" : this.state.avatar? this.state.avatar : ' ',
                       "phone" : this.state.phone,
                       "email" : this.state.email,
                       "invite": 'Вітаю! Я можу Вам чимось допомогти? (' + Platform.OS + ')',
                       "url" : 'support.ua mobile'
                    },
                    "message" : {
                        "type" : "photo",
                        "id"   : message.id,
                        "file": 'https://my.support.ua/public/uploads/jivochat/'+responseJson.file, 
                        "file_url": 'https://my.support.ua/public/uploads/jivochat/' + responseJson.file
                    }
                 }

                // console.log(object);
                fetch('https://my.support.ua/mobile-api/jivochat-client?api_key=55d41bafc7d483d86d31c9c7d3e6cfea', {
                   method: 'POST',
                   body: JSON.stringify(object)
               }).then(response => response.json()).then(responseJson => {
                //   console.log(responseJson);
               });
               fetch('https://wh.jivosite.com/IF6YK0nYgC56npYB/mCyvGKSuRW', {
                    method: 'POST',
                    body: JSON.stringify(object)
                });  

                this.getChat();
                 
            });
            return;
        } else {
            let object = {
                "sender" :
                {
                      "id" : this.state.userToken,
                   "name"  : name,
                   "photo" : this.state.avatar? this.state.avatar : ' ',
                   "phone" : this.state.phone,
                   "email" : this.state.email,
                   "invite": 'Вітаю! Я можу Вам чимось допомогти? (' + Platform.OS + ')',
                   "url" : 'support.ua mobile'
                },
                "message" : {
                    "type" : "text",
                    "id"   : message.id,
                    "text" : message.body
                }
             }

            await fetch('https://wh.jivosite.com/IF6YK0nYgC56npYB/mCyvGKSuRW', {
                 method: 'POST',
                 body: JSON.stringify(object)
             });
         
             await fetch('https://my.support.ua/mobile-api/jivochat-client?api_key=55d41bafc7d483d86d31c9c7d3e6cfea', {
                method: 'POST',
                body: JSON.stringify(object)
            }).then(response => response.text()).then(responseJson => {
               // console.log(responseJson);
            });
        }
        
     }

  render()    {
     return (
      <HeaderWrapper navigation={this.props.navigation} style={styles.wrapper}>
             <AwesomeChat 
                    backgroundImage={require('../../../assets/images/chat_bg.png')}
                    onSendMessage={(message) => this.sendMessage(message)} 
                    openImage={message => this.openImage(message)}
                    messages={this.state.messages}
                    sentMessageStyle={{backgroundColor:'#D3D3D3'}}
                    receivedMessageStyle={{backgroundColor:'#f3be20'}}
                    sentTextStyle={{color:'#000'}}
                    receivedTextStyle={{color:'#000'}}
                    //If new messages come in, just update this.state.messages
             />
        </HeaderWrapper>
    )};
}

function withMyHook(Component) {
    return function WrappedComponent(props) {
      const focused = useIsFocused();
      return <Component {...props} isFocused={focused} />;
    }
  }
  
  export default withMyHook(ChatScreen);


