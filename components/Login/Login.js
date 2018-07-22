import React from 'react'

import { 
  View, 
  Image,
  StyleSheet,
  KeyboardAvoidingView
} from 'react-native'

import LoginForm from './LoginForm'

const LoginComponent = (props) => {
  return(
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <View style={styles.loginContainer}>
        <Image resizeMode="contain" style={styles.logo} 
          source={require('../../assets/logoprincipal.png')} />
      </View>
      <LoginForm navigation={props.navigation} />
    </KeyboardAvoidingView >
  )
}

export default LoginComponent

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
