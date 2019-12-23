import React from 'react';
import {
  Alert,
  PermissionsAndroid,
  Image,
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  ImageBackground
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Button from 'react-native-button';
import {
  Card,
  CardImage,
  CardTitle,
  CardContent,
  CardAction,
} from 'react-native-card-view';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import CommentBoxInput from './CommentBoxInput';
import Listpage from '../src/Listpage';
import Header from '../src/header';

export async function request_camera_runtime_permission() {

  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        'title': 'XENIA Camera Permission',
        'message': 'XENIA App needs access to your Camera '
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {

    }
    else {
      Alert.alert("Camera Permission Not Granted");
    }
  } catch (err) {
    console.warn(err)
  }
}
export default class App extends React.Component {
  static navigationOptions = {
     header: null,
  };
  async componentDidMount() {
  await request_camera_runtime_permission()
}

  constructor(props) {
    super(props)
    this.state = {
      file:'',
      comment:'',
    };
    this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
  }
  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
       skipBackup: true,
      },
    };
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source = {uri: response.uri};
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          file: source,
        });
      }
    });
  }
   submit = () =>{
     const {file,comment} = this.state;
     console.log("I am going to call login api")
      var data = JSON.stringify({
        file:this.state.file,
        comment:this.state.comment,
      })
     console.log(data);
var xhr = new XMLHttpRequest();
xhr.withCredentials = true;
xhr.addEventListener("readystatechange", function () {
if (this.readyState === 4) {
  console.log(this.responseText);
}
if (xhr.status === 200) {
  console.log("Successfully200")
  // context.props.navigation.navigate("welcome");
}else{
  console.log("inside error")
   alert(xhr.responseText);
}
});
xhr.open("POST", "http://erpportaltest.xeamventures.com/api/v1/attendance-location");
xhr.setRequestHeader("Accept", "application/json");
xhr.setRequestHeader("Content-Type", "application/javascript");
xhr.setRequestHeader("Authorization", "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjkyYTg4NTcwYjA3YTc4NjU3M2YwZmI5MjcyYWQzNGU5ZTMxZTMyMjVhYmNkMmMzNzVkYmE3MzY1YmJmNzI1ZjM3MWM1ZGMzOTNmOTY2ODBlIn0.eyJhdWQiOiIzIiwianRpIjoiOTJhODg1NzBiMDdhNzg2NTczZjBmYjkyNzJhZDM0ZTllMzFlMzIyNWFiY2QyYzM3NWRiYTczNjViYmY3MjVmMzcxYzVkYzM5M2Y5NjY4MGUiLCJpYXQiOjE1NzcwOTkwOTcsIm5iZiI6MTU3NzA5OTA5NywiZXhwIjoxNjA4NzIxNDk3LCJzdWIiOiIxMDYiLCJzY29wZXMiOltdfQ.eNc8WnncNEuDcRrWa1VE33JgRTuhjdRWK0iKjCW_B7KaEHVRDHlrlsGvAx87-yhmTRZuKDV8s6PNnGROOjsa3QUoEuno2iBayQcO71P2AGiQt5rV1JsiMFRqkC2xn3rtAtf0eqmZcgyObxyXOjwq_1LbaBaRleJvD0Fthf7foqP0Wdp782N06IOAz53Mpf1HoroWemmp0dTFKRtmzd51Fr82jbNMs75eyb3hO-9Bb5eRJtI2Intmu9ZNlHkGXlR2zvqwCoSf-X8SBgLaF8F6PO3Gw27-yaXIihUbKYN6_vJjuRyUKrWnr2WJevKQOtZNO7hnFgfYjoPuN2V00Ydu4sfphf6aNXLQ2O-8EhviKvA6MCgJWtML_cwFh3kPOKeeM8j2zHAMf-BE1US45Txs-8BBE70koezE11reWZxfE3FOv1t0q568FbWGOViPeb24zkCp7bzNnn48LuPMwjE9_Iuen_gJLiKFkBQJRsvK6bJFYmK5Subgz60W_9qdu209OprRS6WS-nW_8hhgdUrklT2KTOmw0GVMIQ_Bi8i9U92xjBjA8hvn0ImDXvlEOA13snM9ffgn7garhWV4YNXxPwjwLkzv-aA6es0FVjXI_DOuzUQMxOafv03g79kx3y7yv1EjAziNrIEMpRd9PLPXhXBb4Iv1tVApOSkqPFNVEes");
xhr.send(data);
   }

  render() {
    const {navigate} = this.props.navigation;
    const card = {card: {width: 500, height: 350}};
    return (
      <KeyboardAvoidingView behavior="position" style={styles.container}>
      <Card styles={card}>
      <Header/>
        <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
          <View
            style={[styles.avatar, styles.avatarContainer, {marginTop: -7}]}>
            {this.state.file === null ? (
              <Text style={{fontSize:10, textColor:'blue'}}>Select a Photo</Text>
            ) : (
              <Image style={styles.avatar} source={this.state.file} />
            )}
            </View>
          </TouchableOpacity>
          <View><Text style={{fontSize:50, top:50}}>MAP VIEW</Text></View>
          <CommentBoxInput
            placeholder="COMMENT BOX"
            autoCapitalize={'done'}
            returnKeyType={'done'}
            onChangeText={comment => this.setState({ comment })}
            autoCorrect={true}/>
            <CardAction >
           <Button
             style={styles.button}
             onPress={() => this.submit()}>
             SUBMIT
           </Button>
           </CardAction >
            </Card>
    </KeyboardAvoidingView>

    );
  }
}

const styles = StyleSheet.create({
  button: {
     marginBottom:10,
    color: '#DCE4EF',
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:50,
    paddingRight:50,
    backgroundColor:'rgb(19,111,232)',
    borderRadius:10,
    borderWidth: 1,
    borderColor: 'rgb(0,0,0)'
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',

  },
  avatarContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 5 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    borderRadius: 10,
    width:400,
    height: 150,
  },
});
