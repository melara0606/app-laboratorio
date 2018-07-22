import React, { Component } from 'react';
import { 
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  Alert,
  AsyncStorage
} from 'react-native';

import t from 'tcomb-form-native';

import { postLogin, URL_BASE } from '../utils'

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

export default class LoginForm extends Component {
  state = {
    isLoggind: true,
    formData: {}
  }
  onButtonPress = () => {
    const value = this.refs.form.getValue();
    if(value){
      postLogin(value.username, value.password)
        .then(json => {
          if(json.response){
            try {
              AsyncStorage.setItem('@MySuperStore:key', JSON.stringify(json.data), () => {
                this.props.navigation.navigate('Tabs');
                Alert.alert(
                  'Bienvenido(a)', 
                  `${json.data.name_pac} ${json.data.lastname_pac}` 
                )                
                this.setState({ isLoggind: true })
              })
            } catch (error) { 
              this.setState({ isLoggind: true })
            }
          }else{
            Alert.alert( 'Error', json.message )
            this.setState({ isLoggind: true })
          }
        })
      this.setState({ isLoggind: false })
    }
  }
  getFormLogin() {
    return(
      <View style={styles.container}>
        <Form 
          ref="form"  
          type={User}
          options={options}
          value={this.state.formDatas} />
        <TouchableOpacity style={styles.buttonContainer} onPress={this.onButtonPress}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    )
  }
  getSpinnerLoggin() {
    return(
      <View style={styles.container}>
        <ActivityIndicator style={styles.indicator} size={1} color="#68BCFF" />
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
