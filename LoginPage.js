import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {
  Card,
  CardImage,
  CardTitle,
  CardContent,
  CardAction,

} from 'react-native-card-view';
import UserInput from './UserInput';
import Button from 'react-native-button';

import usernameImg from './Image/username.png';
import passwordImg from './Image/password.png';

export default class LoginPage extends Component {

  static navigationOptions = {

  };

  	constructor(props){
  		super(props)
  		this.state={
  			employee_code:'',
  			userPassword:''
  		}
  	}

  	login = () =>{
  		const {employee_code,userPassword} = this.state;
  		let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
  		if(employee_code==""){
  			//alert("Please enter Email address");
  		  this.setState({employee_code:'Please enter Emplyee id'})

  		}

  		else if(reg.test(employee_code) === false)
  		{
  		//alert("Email is Not Correct");
  		this.setState({employee_code:'Emplyee id is Not Correct'})
  		return false;
  		  }

  		else if(userPassword==""){
  		this.setState({employee_code:'Please enter password'})
  		}
  		else{

  		fetch('http://erpportaltest.xeamventures.com/api/v1/login',{
  			method:'post',
  			header:{
  				'Accept': 'application/json',
  				'Content-type': 'application/json'
  			},
  			body:JSON.stringify({
  				// we will pass our input data to server
  				employee_code: employee_code,
  				password: userPassword
  			})

  		})
  		.then((response) => response.json())
  		 .then((responseJson)=>{
  			 if(responseJson == "ok"){
  				 // redirect to profile page
  				 alert("Successfully Login");
  				 this.props.navigation.navigate("Welcomepage");
  			 }else{
  				 alert("Wrong Login Details");
  			 }
  		 })
  		 .catch((error)=>{
  		 console.error(error);
  		 });
  		}


  		Keyboard.dismiss();
  	}
  render () {
    const {navigate} = this.props.navigation;
    return (
      <KeyboardAvoidingView behavior="height" style={styles.container}>

      <Card style={styles.cardview}>

        <CardTitle>
          <Text style={styles.title}>LOGIN</Text>
        </CardTitle>

        <UserInput
          source={usernameImg}
          placeholder="Emplyee Code"
          autoCapitalize={'none'}
          returnKeyType={'done'}
          autoCorrect={false}
        />
        <UserInput
          source={passwordImg}
          secureTextEntry={true}
          placeholder="Password"
          returnKeyType={'done'}
          autoCapitalize={'none'}

          autoCorrect={false}
        />

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.btnEye}
          onPress={this.showPass}>
        </TouchableOpacity>

          <Button
            style={styles.button}
            onPress={() => navigate('welcome')}>
            SUBMIT
          </Button>
        </Card>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    color: 'rgb(19,111,232)',
    fontSize: 38,
  },
  cardview: {
    top:40,
  },
  button: {
    marginRight: 10,
    color: '#DCE4EF',
    marginRight:0,
    marginLeft:0,
    marginTop:50,
    marginBottom: 50,
    paddingTop:23,
    paddingBottom:23,
    paddingLeft:50,
    paddingRight:50,
    backgroundColor:'rgb(19,111,232)',
    borderRadius:10,
    borderWidth: 1,
    borderColor: 'rgb(0,0,0)'
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#2B2929',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  container: {

    flex: 1,
    flexDirection: 'column',
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
