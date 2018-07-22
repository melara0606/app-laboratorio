import React from 'react';

import { 
  View,   
  Image, 
  StyleSheet,
  AsyncStorage
} from 'react-native';

import IndicatorComponent from './UtilComponents/IndicatorComponent'

export default class PortadaComponent extends React.Component {
  componentWillMount() {
    try {
      AsyncStorage.getItem('@MySuperStore:key', (err, result) => {
        if(result){
          global.credentials = result
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
    <IndicatorComponent />
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
  width: 300,
  marginBottom: 30
 },
 indicator:{
  marginTop: 40
 }
});
