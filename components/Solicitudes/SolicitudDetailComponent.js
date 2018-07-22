import React from 'react'

import { 
  ScrollView, 
  View, 
  Modal,
  StyleSheet
} from 'react-native'

import moment from 'moment'

import { Tile, List, ListItem } from 'react-native-elements'

import IndicatorComponent from '../UtilComponents/IndicatorComponent'
import { getObjectDataSolicitudItem, convertMoneda } from '../UtilComponents/FetchServidor'
import SolicitudModalComponent from './SolicitudModalComponent'

export default class SolicitudDetailComponent extends React.Component {
  state = {
    item: {},
    isLoading: true,
    modalVisible: false
  }

  onPressModalButton = () => {
    this.setState({
      modalVisible: false
    })
  }

  componentWillMount = () => {
    let { id } = this.props.navigation.state.params
    getObjectDataSolicitudItem(id).then(j => {
      this.setState({ isLoading: false, item: j.data })
    })
  }  
  
  render() {
    if(this.state.isLoading) 
      return <IndicatorComponent />

    let { item, modalVisible } = this.state
    let estado = (item.estado == 1) ? "Iniciada" : "Cancelada"
    let type = (item.tipo_solicitud == 1) ? "Promocion" : (item.tipo_solicitud == 2) ?"Particular" : "Entidad"
    let fechaFormato = moment(item.fecha_creacion).format('LLL')

    return(
      <ScrollView>
        <Tile featured height={150}  title={`${item.nombre_sucursal}`} caption={fechaFormato} />
        <List>
          <ListItem  title="Monto" rightTitle={`$ ${convertMoneda(item.monto, 2)}`}  hideChevron />
          <ListItem  title="Estado"  badge={{  value: estado }} hideChevron />
          <ListItem  title="Tipo de Solicitud"  badge={{  value: type }} hideChevron />          
          <ListItem  title="Mostrar Examenes" 
            onPress={() =>  this.setState({ modalVisible: true }) } badge={{ value: item.items.length }} />
        </List>
        <SolicitudModalComponent modalVisible={ modalVisible } items={ item.items } onPress={this.onPressModalButton} />
      </ScrollView>      
    )
  }
}