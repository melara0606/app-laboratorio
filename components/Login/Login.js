import React, { Component } from 'react';
import { 
  View, 
  Image,
  StyleSheet,
  KeyboardAvoidingView
} from 'react-native';

import LoginForm from './LoginForm'

export default class Login extends Component {
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.loginContainer}>
          <Image resizeMode="contain" style={styles.logo} source={require('../../assets/logoprincipal.png')} />
        </View>
        <LoginForm navigation={this.props.navigation} />
      </KeyboardAvoidingView >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  loginContainer:{
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    position: 'absolute',
    width: 300,
    height: 100
  }
});
