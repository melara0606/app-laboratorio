import React, { Component } from 'react'
import { ScrollView, AsyncStorage }  from 'react-native'
import { List, ListItem } from 'react-native-elements'

class Configuraciones extends Component {
  onPress() {
    AsyncStorage.clear(() => {
      this.props.navigation.navigate('Login')
    })
  }
  render() {
    return (
      <ScrollView>
        <List>
          <ListItem onPress={this.onPress.bind(this)} title="Salir" rightIcon={{ name: 'cancel' }} />
        </List>
      </ScrollView>
    );
  }
}

export default Configuraciones
