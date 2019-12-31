import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  View,
  Image
} from 'react-native';
import {
  Card,
  CardImage,
  CardTitle,
  CardContent,
  CardAction,
} from 'react-native-card-view';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Button from 'react-native-button';
import Header from '../src/header';

export default class Welcomepage extends Component {
  static navigationOptions = {
     header: null,
  };

    render () {
      const context=this;
       var userObj = JSON.parse(context.props.navigation.state.params.userObj);
       console.log(userObj.success.user.employee.profile_picture);
        const {navigate} = this.props.navigation;
        var profile_picture={uri:userObj.success.user.employee.profile_picture};
		return(

           <Card>
           <Header/>
            <CardImage>
           <Image source={profile_picture} style={{bottom:70,height:150,width:150,borderRadius:75,borderColor:'black'}}/>
            </CardImage>
          <CardTitle>
            <Text style={{fontSize:50, color: 'black',alignItems: 'center',top:35,textAlignVertical:'center',textAlign:'right'}}>WELCOME</Text>
              </CardTitle>
               <CardTitle>
            <Text style={{fontSize:30, color: 'black',bottom:0,alignItems: 'center',textAlignVertical:'center',textAlign:'right'}}>{userObj.success.user.employee.fullname}</Text>
               </CardTitle>
          <CardAction >
            <Button
              style={styles.button1}
              onPress={() => navigate('cameraPage')}>
              Check In
            </Button>

            <Button
              style={styles.button2}
              onPress={() => navigate('cameraPage')}>
              Check Out
            </Button>
              </CardAction >
              </Card>
      );
    }
  }


  const styles = StyleSheet.create({

    button1: {

      flex:0,
      margin: 0,
      color: '#DCE4EF',
      left: 0,
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
      marginBottom:180,
      marginRight:10,
      paddingTop:23,
      paddingBottom:23,
      paddingLeft:50,
      paddingRight:50,
      backgroundColor:'rgb(19,111,232)',
      borderRadius:10,
      borderWidth: 1,
      borderColor: 'rgb(0,0,0)',
    },
    button2: {
      flexDirection: 'row',
      flex:0,
      margin: 0,
      marginTop:0,
      marginLeft:0,
      marginRight:0,
      marginBottom:0,
        right:0,
        color: '#DCE4EF',
        alignItems: 'center',
        marginBottom:180,
        marginLeft:10,
        paddingTop:23,
        paddingBottom:23,
        paddingLeft:50,
        paddingRight:50,
        backgroundColor:'rgb(19,111,232)',
        borderRadius:10,
        borderWidth: 1,
        borderColor: 'rgb(0,0,0)',

      },
    separator: {
      marginVertical: 8,
      borderBottomColor: '#2B2929',
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    container: {
      flex: 0,
      flexDirection: 'row',
      alignItems: 'center',
    },
    btnEye: {
      position: 'absolute',
      top: 20,
      right: 28,
    },
    iconEye: {
      width: 50,
      height: 50,
      tintColor: "black",
    },

  });
