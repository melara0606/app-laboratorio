import React from 'react'

import {
  ScrollView
} from 'react-native'

import { List, ListItem } from 'react-native-elements'

import IndicatorComponent from '../UtilComponents/IndicatorComponent'
import { getObjectDataSolicitudAdomicilio  } from '../UtilComponents/FetchServidor'

export default class SolicitudAdomicilioComponent extends React.Component {
  state = {
    isLoading: true,
    solicitudes: []
  };

  componentWillMount() {
    getObjectDataSolicitudAdomicilio().then(json => {
      this.setState({
        isLoading: false,
        solicitudes: json.data
      })
    })
  }

  render() {
    let { isLoading, solicitudes } = this.state

    if(isLoading){
      return <IndicatorComponent />
    }
    
    return (  
      <ScrollView>
        <List>
          {solicitudes.map((item) => {
            return (
              <ListItem 
                key={item.codigo} title={item.codigo} subtitle={item.nombre_sucursal}
                chevron 
                onPress={() => {
                  this.props.navigation.navigate('SolicitudAdomicilioDetails', { 
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