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
import { Marker } from 'react-native-maps';
import MapView, {PROVIDER_GOOGLE, PROVIDER_DEFAULT} from 'react-native-maps';
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
export async function request_ACCESS_FINE_LOCATION_runtime_permission() {

  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        'title': 'XENIA LOCATION Permission',
        'message': 'XENIA App needs access to your LOCATION '
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      Alert.alert("LOCATION Permission Granted.");
    }
    else {
      Alert.alert("LOCATION Permission Not Granted");
    }
  } catch (err) {
    console.warn(err)
  }
}
export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(position => resolve(position), e => reject(e));
  });
};
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
      file:"http://erpportaltest.xeamventures.com/public/uploads/profile-pics/1563432304.png",
      comment:'',
      latitude: '30.715260',
      longitude:'76.707770',
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
        let source = {uri:response.uri};
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          file: source,
        });
      }
    });
  }
  componentDidMount() {
    return getCurrentLocation().then(position => {
      if (position) {
        this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.003,
            longitudeDelta: 0.003,
        });
      }
    });
  }
  async componentDidMount() {
  await request_ACCESS_FINE_LOCATION_runtime_permission()
  }
   submit = () =>{
     const {file,comment,longitude,latitude} = this.state;
     console.log("I am going to call login api")
      var data = JSON.stringify({
          latitude:this.state.latitude,
          longitude:this.state.longitude,
          comment:this.state.comment,
          file:this.state.file,
      })
     console.log(data);
var xhr = new XMLHttpRequest();
xhr.withCredentials = true;
xhr.addEventListener("readystatechange", function () {
  console.log(xhr.status)
  console.log(xhr.readyState)
  if (xhr.readyState !== 4) {
              return;
  }
  if (xhr.status === 200) {
    console.log("Successfully200")
  }else{
    console.log("inside error")
  }
  console.log(this.responseText);
  alert(this.responseText);


});
xhr.open("POST", "http://erpportaltest.xeamventures.com/api/v1/attendance-location");
xhr.setRequestHeader("Accept", "application/json");
xhr.setRequestHeader("Content-Type", "application/javascript");
xhr.setRequestHeader("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImVlYTkwNjlhMjM3NmNkZTY3OWY5OWZhYjU1OWVkOTY3NmE5Y2M5MTY3ODRhYjUwYTY5NDc3ZjZjN2U0ODhlYTY3NzU5OTI2NTgwZTdiNjg2In0.eyJhdWQiOiIzIiwianRpIjoiZWVhOTA2OWEyMzc2Y2RlNjc5Zjk5ZmFiNTU5ZWQ5Njc2YTljYzkxNjc4NGFiNTBhNjk0NzdmNmM3ZTQ4OGVhNjc3NTk5MjY1ODBlN2I2ODYiLCJpYXQiOjE1NzcxODQ0MzYsIm5iZiI6MTU3NzE4NDQzNiwiZXhwIjoxNjA4ODA2ODM2LCJzdWIiOiIxMDYiLCJzY29wZXMiOltdfQ.qcX9DC2k7VNPyVcgg5nw81DR9j0waoeTG9oasGXEWHlApKvMDuPk1_BpPqm-9GYLFwZdgfm7fxwUl7Ry16VnVxrj0WnkBsrI4J3ZSpgI5izngw4cdTW93FWZzEwfy5kW_fgvJCLxOT4ZJL-nSbkTusjXd-zTa1SeWvX7svgoWduQHYphe_1-aog0xDzDS-uEnD4ZXS1yWHU_mEEFWFxzxtJwsJl8hoUJZUDep__i2cjvcGCTj9orFoSjjj8SZvq08OLLyijrhk5YtM55l_9320H8O1VqCRZVLiJChFNbtfaI2NykUfClGnv0SfZZOBYShDtAx9op-CmS-OdwkkeHhB030BySXtcJv8qFl0xWmo2SMTCZqlXqYpGVn3vRcNgxGKB_vu-kRG56m5LCIpi49njMJWiX5BnN8Jzv1H61DnsKNTLGdgYYbiTJeKptiiW0vzUfnyMI2xc7WuPvFua2HzPDMPM6BitRu3aE3ATCbDh45BTu4IFdiLV4R25kKY8QI7ucESa2XLbfER5j2Gbt8tGNFy92MVzpTwfvUe0tlCcOggniDQ5cZpEXkEFT9nZaQdj1V-Tl-EcnA7bXhTHicu2Z-jjsUFTiAOAEautEF2K4yY_SM4NJF-DlGaEGe7vx2w9Mc0Qoelsgx3Sb9rtVo-tc7ToAxqsrAv5mNrfKsaI");
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
          <View style={styles.MainContainer}>
            <MapView
              style={styles.mapStyle}
              provider={PROVIDER_GOOGLE}
              showsUserLocation={true}
              zoomEnabled={true}
              zoomControlEnabled={true}
              Region={{
                latitude: 30.715260,
                longitude: 76.707770,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}>
              <Marker
                coordinate={{ latitude:30.715260, longitude:76.707770 }}
                title={""}
                description={""}
              />
            </MapView>
          </View>
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
    borderTopWidth: 1,
    borderBottomWidth:1,
    borderRightWidth:1,
    borderLeftWidth:1,
    width:400,
    height: 150,
  },
  MainContainer: {
    borderRadius: 8,
    borderTopWidth: 1,
    borderBottomWidth:1,
    borderRightWidth:1,
    borderLeftWidth:1,
    position: 'absolute',
    height: 200,
    width: 400,
    marginBottom: 200,
    left: 50,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  mapStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
