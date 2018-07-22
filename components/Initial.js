import React, { Component } from 'react';
import { 
  View,   
  Image, 
  StyleSheet,
  AsyncStorage,
  ActivityIndicator
} from 'react-native';

export default class InitialComponent extends Component {
  componentWillMount() {
    try {
      AsyncStorage.getItem('@MySuperStore:key', (err, result) => {
        if(result){
          this.props.navigation.navigate('Tabs')
        }else{
          this.props.navigation.navigate('Login')
        }
      })     
    } catch (error) {  this.props.navigation.navigate('Login') }
  }

 render() {
  return (
   <View style={styles.container}>
    <Image style={styles.logo} resizeMode="contain" source={require('../assets/logo.png')} />
    <ActivityIndicator style={styles.indicator} size={1} color="#68BCFF" />
   </View>
  );
 }
}

const styles = StyleSheet.create({
 container: {
  flex:1,
  flexDirection: 'column',
  justifyContent: 'center',
  backgroundColor: 'white',
  alignItems: 'center'
 },
 logo: {
  width: 300
 },
 indicator:{
  marginTop: 40
 }
});
