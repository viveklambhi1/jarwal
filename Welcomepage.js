import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  View
} from 'react-native';

import {
  Card,
  CardImage,
  CardTitle,
  CardContent,
  CardAction,

} from 'react-native-card-view';
import { StackNavigator } from 'react-navigation';
import Button from 'react-native-button';

export default class Welcomepage extends Component {

    render () {
		return(
        <Card>
          <CardTitle>
            <Text style={{fontSize:50, color: 'black',left:140,alignItems: 'center',top:190}}>WELCOME</Text>
            <Text style={{fontSize:30, color: 'black',top:260,alignItems: 'center',right:120}}>Employee Name Here</Text>
          </CardTitle>

            <Button
              style={styles.button1}
              onPress={() => {}}>
              Check In
            </Button>
            <Button
              style={styles.button2}
              onPress={() => {}}>
              Check Out
            </Button>

        </Card>

      );
    }
  }

  const styles = StyleSheet.create({

    button1: {
      flexDirection: 'row',
      flex:0,
      margin: 0,
      color: '#DCE4EF',
      top: -68,
      left: -100,
      alignItems: 'center',
      paddingTop:23,
      paddingBottom:23,
      paddingLeft:50,
      paddingRight:50,
      backgroundColor:'rgb(19,111,232)',
      borderRadius:10,
      borderWidth: 2,
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
        right:-100,
        color: '#DCE4EF',
        top: -142,
        alignItems: 'center',
        paddingTop:23,
        paddingBottom:23,
        paddingLeft:50,
        paddingRight:50,
        backgroundColor:'rgb(19,111,232)',
        borderRadius:10,
        borderWidth: 2,
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
