import React, { Component } from 'react'

import { 
  View,
  Text,
  Alert,
  StyleSheet,
  AsyncStorage,
  TouchableOpacity
} from 'react-native'

import t from 'tcomb-form-native';

import IndicatorComponent from '../UtilComponents/IndicatorComponent'

const Form = t.form.Form;

const formStyles = {
  ...Form.stylesheet,
  textbox: {
    normal: {
      height: 48,
      padding: 16,
      marginBottom: 5,
      borderRadius: 5,
      backgroundColor: 'rgba(225,225,225,0.8)'
    },
    error: {
      borderRadius: 5,
      borderColor: "#a94442",
      padding: 16,      
      height: 48,
      borderWidth: 1,      
      marginBottom: 5
    }
  }
}

const User = t.struct({
  username: t.String,
  password: t.String
});

const options = {
  stylesheet: formStyles,
  fields: {
    username: {
      label: 'Usuario',
      placeholder: 'Escriba su usuario',
      error: 'El usuario es requerido'
    },
    password: {
      label: 'Contraseña',
      secureTextEntry: true,
      placeholder: 'Escriba su contraseña',
      error: 'La contraseña es requerida'
    }
  },
};

import {loginUsuarioServidor} from '../UtilComponents/FetchServidor'

export default class LoginForm extends Component {
  state = {
    isLoggind: true,
    formData: {}
  }

  onButtonPress = () => {
    const {username, password} = this.refs.form.getValue();
    loginUsuarioServidor(username, password).then(json => {
      if(json.response){
        this.props.navigation.navigate('Tabs');
        let { name_pac, lastname_pac } = json.data
        global.credentials = JSON.stringify(json.data)
        AsyncStorage.setItem('@MySuperStore:key', global.credentials, () => {
          Alert.alert(
            'Bienvenido(a)', `${name_pac} ${lastname_pac}` 
          )
          this.setState({ isLoggind: true })
        })
      }else{
        this.setState({ isLoggind: true })
        Alert.alert( 'Error', json.message )
      }
    })
  }
  
  getFormLogin() {
    return(
      <View style={styles.container}>
        <Form 
          ref="form"  
          type={User}
          options={options}
          value={this.state.formDatas} />
        <TouchableOpacity style={styles.buttonContainer} 
          onPress={this.onButtonPress}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    )
  }
  getSpinnerLoggin() {
    return(
      <View style={styles.container}>
        <IndicatorComponent />
      </View>
    )
  }
  render() {
    const isLoggind = this.state.isLoggind
    return (
      <View>
        { isLoggind ? this.getFormLogin() : this.getSpinnerLoggin() }             
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   padding: 20
  },
  buttonContainer:{
    backgroundColor: '#2980b6',
    paddingVertical: 15
  },
  buttonText:{
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700'
  }, 
  loginButton:{
    backgroundColor:  '#2980b6',
    color: '#ffffff'
  },
  indicator: {
    marginBottom: 60
  }
});
