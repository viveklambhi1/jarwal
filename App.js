import React, {Component} from 'react';

import {
  StyleSheet,
  KeyboardAvoidingView,
  View,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  AppRegistry
} from 'react-native';
import {
  Card,
} from 'react-native-card-view';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import LoginPage from './src/LoginPage';
import Welcomepage from './src/Welcomepage';



  const MainNavigator = createStackNavigator({
  login: {screen: LoginPage},
  welcome: {screen: Welcomepage},
});

const App = createAppContainer(MainNavigator);
  export default App;
