import React, { Component } from 'react'
import {
  Text,
  View,
  ScrollView,
  AsyncStorage
} from 'react-native'

import { URL_BASE } from './utils'
import SpinnerComponent from './SipnnerComponent'
import { List, ListItem, Badge } from 'react-native-elements'

export default class Feed extends Component {
  state = {
    isLoading: false,
    solicitudes: []
  };

  onLearnMore = (item) => {
    this.props.navigation.navigate('Details', { 
      id: item.id
    });
  };

  componentWillMount() {
    AsyncStorage.getItem('@MySuperStore:key', (err, results) => {
      let parse = JSON.parse(results)
      fetch(`${URL_BASE}/movil/solicitudes`, {
        method: 'POST',
        body: JSON.stringify({
          id: parse.id
        })
      }).then(response => response.json())
        .then(json => this.setState({ solicitudes: json.data, isLoading: true }))
    })
  }

  render() {
    let state = this.state
    if(!state.isLoading){
      return <SpinnerComponent />
    }else{
      return (
        <ScrollView>
          <List>
            {state.solicitudes.map((item) => {
              let estado = (item.estado == 1) ? "Iniciada" : "Cancelada"
              return (
                <ListItem
                  key={item.id}
                  title={`${item.id}`}
                  subtitle={item.nombre_sucursal}
                  onPress={() => this.onLearnMore(item)}
                />
              )
            })}
          </List>
        </ScrollView>
      );
    }
  }
}