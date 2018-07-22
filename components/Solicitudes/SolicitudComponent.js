import React from 'react'

import {
  ScrollView
} from 'react-native'

import { List, ListItem } from 'react-native-elements'

import IndicatorComponent from '../UtilComponents/IndicatorComponent'
import { getObjectDataSolicitud  } from '../UtilComponents/FetchServidor'

export default class SolicitudComponent extends React.Component {
  state = {
    isLoading: true,
    solicitudes: []
  };

  componentWillMount() {
    getObjectDataSolicitud().then(json => {
      this.setState({
        isLoading: false,
        solicitudes: json.data
      })
    })
  }

  render() {
    let {isLoading} = this.state

    return (
      isLoading ? 
        <IndicatorComponent /> :       
        <ScrollView>
          <List>
            {this.state.solicitudes.map((item) => {
              return (
                <ListItem
                  key={item.id}
                  title={`${item.id}`}
                  subtitle={item.nombre_sucursal}
                  onPress={() => {
                    this.props.navigation.navigate('Details', { 
                      id: item.id
                    });                    
                  }}
                />
              )
            })}
          </List>
        </ScrollView>    
    )
  }
}