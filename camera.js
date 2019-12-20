import React from 'react';
import {
  Image,
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
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
import Listpage from '../src/Listpage';
export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      file:'',
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
     const {file} = this.state;
     console.log("I am going to call login api")
      var data = JSON.stringify({
        file:this.state.file,
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
xhr.setRequestHeader("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImNiZTE5YjlmNDg0NGUwZmEyMDM1Y2MxZTZlN2VkOWZhNmZkYzc3YzhmZDkzMzM5MTQxYjc3ZWE3YjUyMjQwMWJhYWFkMWYwYmIyODBiMDY5In0.eyJhdWQiOiIzIiwianRpIjoiY2JlMTliOWY0ODQ0ZTBmYTIwMzVjYzFlNmU3ZWQ5ZmE2ZmRjNzdjOGZkOTMzMzkxNDFiNzdlYTdiNTIyNDAxYmFhYWQxZjBiYjI4MGIwNjkiLCJpYXQiOjE1NzY4NDQ1NjAsIm5iZiI6MTU3Njg0NDU2MCwiZXhwIjoxNjA4NDY2OTYwLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.bv2WgethBcm5Y2Ql93O1dscDRK2Ng7kkFCKBDVA_3dksCLtvBNxF0kex3UyWk0te-gUqzpQYU1j98o0Ipq9_NiR7yP2lb2Jj8ZpMCPrZfbxyWOm0fc9OVOonjrE1FR-bY8ri_pvygCdD6pBN_YD_RsLvASKnEsNykemrHrYtvJ4w0QcVsQR3Iu5pvir2DLFL2CpDiip5SRVkmSKJ6F0kLBAM5skZgi6VDp-IpZC3yP-34c3L4KN1t_36A1W5NgG1U6vuZTZEeB_E7TAmR1B7M5ZgSx8hD8Z4-br7pMq9rT-G8z18LG4hWYmEZwl3NH6T_PixNKliJlTnkRlWdev7yMQeR3IG-SuM-S0KvDuI-Dvv7As5cf8rVhxLDTArwQsyro8S9ksfmTbI_WbV3wQnrpT3FevCFKj7Ins7IIGCq-2bdlggaI5crPwOL3SWq0gCGHYxXOK5FtVbBlDPnyofq-Bc_4Wc7OHjBWn6Xjjk2NbLCOyWEJDg_iMn7XdLwTrsg49GgFS1RKLBTztiNTcFBXhaB5UlXecGwoJujNi3XfvMED91OuF82LdwnmvyZS3QbOLjoCC0EpmE8FG4l131JsCXJ2Wi7cabRv2kxier9YDQjhQzvG9Cb9gkV3kBJF-UJcXuzPZE6sZSwhJgQh79vnBvzGd94RUDKiCyyzC1nkI");
xhr.send(data);
   }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <Card style={styles.cardview}>
        <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
          <View
            style={[styles.avatar, styles.avatarContainer, {marginBottom: 10}]}>
            {this.state.file === null ? (
              <Text style={{fontSize:100, textColor:'blue'}}>Select a Photo</Text>
            ) : (
              <Image style={styles.avatar} source={this.state.file} />
            )}
            </View>
          </TouchableOpacity>

            <Button
              style={styles.button}
              onPress={() => this.submit()}>
              SUBMIT
            </Button>
    </Card>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    flex:0,
    top:0,
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  avatarContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 5 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    borderRadius: 75,
    width: 150,
    height: 150,
  },
});
