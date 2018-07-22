import React, { Component } from 'react'

import { View, StyleSheet, ActivityIndicator } from 'react-native'

export default class SpinnerComponent extends Component {
 render() {
  return(
   <View style={styles.container}>
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
 }
});