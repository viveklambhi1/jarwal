import React, {Component} from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  ActivityIndicator,
  Alert,
  Picker,
   ScrollView
} from 'react-native';
import {
  Card,
  CardImage,
  CardTitle,
  CardContent,
  CardAction,
} from 'react-native-card-view';
import Icon from 'react-native-vector-icons/Ionicons';
import {createAppContainer,createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import RNPickerSelect from 'react-native-picker-select';
import Button from 'react-native-button';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
export default class Leaves extends Component {

  constructor(props){
  super(props)
  this.state={
              token:'',
              final_data:'',
              final_data_sec:'',
              language:'',
              tvf:''



              }
         }
  static navigationOptions = {

                  };
componentDidMount(){
      this.show_thrd().done();
      this.storage().done();


}

storage=async()=>{

}

_menu = null;

  setMenuRef = ref => {
    this._menu = ref;

  };

  hideMenu = () => {
    this._menu.hide();
  };

  showMenu = () => {
    this._menu.show();
  };

show_sec=async()=>{
  const b="show_sec";
  console.log(b)
  var user_token= await AsyncStorage.getItem('user_token');
  var Att= await AsyncStorage.getItem('Att');
   const id=this.state.Admin;
   console.log(id)
  var permissions_fir= JSON.parse(user_token);
  var Att_fir= JSON.parse(Att);
    const att_sec=Att_fir.success.departments;
  var permissions_sec=permissions_fir.success.secret_token;

this.setState({final_data:att_sec});

this.setState({token:permissions_sec});
var data = null;
const {token}=this.state;
var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {


    if (xhr.readyState !== 4) {
                                return;
                              }
    if (xhr.status === 200) {
     AsyncStorage.setItem('Att',xhr.responseText);
      // context.props.navigation.navigate("welcome");
    }
    else{
      console.log("inside error")


    }
});

xhr.open("GET", "http://erpportaltest.xeamventures.com/api/v1/departments");
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
xhr.setRequestHeader("Authorization", "Bearer " + permissions_sec);

xhr.send(data);
}

show_thrd=async()=>{
  const b="show_thrd";
  console.log(b)
  var departments= await AsyncStorage.getItem('departments-w-e');
  var departments_data= JSON.parse(departments);

 var kgf= departments_data.success.employees;
 // //
  this.setState({final_data_sec:kgf});
  const context=this;
  var user_token= await AsyncStorage.getItem('user_token');


  var permissions_fir= JSON.parse(user_token);



  var permissions_sec=permissions_fir.success.secret_token;

  var data = new FormData();
  const {language}=this.state;
data.append("department_ids", language);

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (xhr.readyState !== 4) {
                      return;
 }
 if(xhr.status===200){
   // console.log(xhr.responseText)

   var json_obj = JSON.parse(xhr.responseText);
   var c = json_obj.success.employees;
   context.setState({tvf:c});
   AsyncStorage.setItem('departments-w-e',xhr.responseText);
 }
 else{
   console.log("inside error")
 }

});

xhr.open("POST", "http://erpportaltest.xeamventures.com/api/v1/departments-wise-employees");

xhr.setRequestHeader("Content-Type", "multipart/form-data");
xhr.setRequestHeader("Authorization", "Bearer  "+ permissions_sec);

xhr.send(data);
}

    render (){
       const {final_data,language,final_data_sec,tvf}=this.state;
       console.log(language)

       // const context=this;
       //   var userObj = (context.props.navigation.state.params.tvf);
       var date ="";
         for (i = 0; i < final_data.length; i++) {
             date += final_data[i].name.split('').join('')+'\n'+'\n';
         };

         var e_name ="";
           for (i = 0; i < tvf.length; i++) {
               e_name += tvf[i].fullname.split('').join('')+'\n';
           };

           var e_id ="";
             for (i = 0; i < tvf.length; i++) {
                 e_id += tvf[i].employee_code.split('').join('')+'\n';
             };


console.log(e_name)
console.log(e_id.split('').join(''))
// console.log(e_id)
		return(
           <View style={styles.pagecomponent}>

           <Picker
  selectedValue={this.state.language}

  style={{top:50,right:100,height: 100, width: 150}}

  onValueChange={(itemValue, itemIndex) =>
    this.setState({language: itemValue})||
    this.show_thrd()
  }>
  <Picker.Item label="departments" value="0" />
  <Picker.Item label="Admin" value="1" />
  <Picker.Item label="IT" value="2" />
  <Picker.Item label="BD Government" value="3" />
  <Picker.Item label="Accounts" value="4" />
  <Picker.Item label="Service Delivery - 2" value="5" />
  <Picker.Item label="HR" value="6" />
  <Picker.Item label="Management" value="7" />
  <Picker.Item label="Service Delivery - 1" value="8" />
  <Picker.Item label="Lakme" value="9" />
  <Picker.Item label="Service Delivery - 3" value="10" />
  <Picker.Item label="BD Corporate" value="11" />
  <Picker.Item label="SD - Custom" value="12" />
</Picker>


<Picker

style={{bottom:50,left:100,height: 100, width: 150}}
>
<Picker.Item label={e_name} value='0' />

</Picker>

           </View>

      );
    }
  }

  const styles = StyleSheet.create({
    pagecomponent: {
      marginTop:10,
       marginLeft:15,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:'#ffffff',
      borderRadius: 10,
      borderTopWidth: 1.5,
      borderBottomWidth:1.5,
      borderRightWidth:1.5,
      borderLeftWidth:1.5,
      borderColor: 'transparent',
      width:viewportWidth/1.1,
       height: '20%',
      // shadowOffset:{  width: 100,  height: 100,  },
      shadowColor: '#330000',
      shadowOpacity: 0,
      // shadowRadius: 0,
      elevation: 5,
    },


  });
