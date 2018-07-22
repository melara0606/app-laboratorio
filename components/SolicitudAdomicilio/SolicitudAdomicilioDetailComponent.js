import React from 'react'

import { 
  ScrollView
} from 'react-native'

import moment from 'moment'

import { List, ListItem } from 'react-native-elements'

import Toast from 'react-native-easy-toast'

import IndicatorComponent from '../UtilComponents/IndicatorComponent'
import { getObjectCitaItem, convertMoneda, updateCitaStatus } from '../UtilComponents/FetchServidor'
import SolicitudModalComponent from '../Solicitudes/SolicitudModalComponent'

export default class CitasDetailComponent extends React.Component {
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

  handleStatusCita() {
    let {item} = this.state
    if(item.estado == 1){
      let { id } = this.props.navigation.state.params   
      updateCitaStatus(id).then(j => {
        item.estado = 0
        this.refs.toast.show(j.message, 500);      
        this.setState({ item, })
      })
    }else{
      this.refs.toast.show('La solicitud ya fue cancelada', 500);
    }
  }

  componentWillMount = () => {
    let { id } = this.props.navigation.state.params

    getObjectCitaItem(id).then(j => {
      this.setState({ 
        item: j, 
        isLoading: false
      })
    })
  }
  
  render() {
    if(this.state.isLoading) 
      return <IndicatorComponent />

    let { item, modalVisible } = this.state
    let estado = (item.estado == 1) ? "Iniciada" : "Cancelada"
    let fechaFormato = moment(item.fecha).format('LLL')
  
    return(
      <ScrollView>
        <List>
          <ListItem  title="Sucursal" rightTitle={`${item.nombre_sucursal}`}  hideChevron />
          <ListItem  title="Horario" rightTitle={`${item.horario}`}  hideChevron />
          <ListItem  title="Fecha" rightTitle={`${fechaFormato}`}  hideChevron />
          <ListItem  title="Pagar" rightTitle={`$ ${convertMoneda(item.pagar, 2)}`}  hideChevron />
          <ListItem  title="Estado" rightTitle={`${estado}`}  hideChevron />

          <ListItem badge={{ value: item.examenes.length }} onPress={() => this.setState({ modalVisible: true }) }
            title="Mostrar Examenes" />
        </List>

        <List>
          <ListItem  
            // chevronColor="#e74c3c"
            // containerStyle={{ backgroundColor: '#e74c3c' }}
            chevronColor="white"
            title={ (item.estado == 1) ? 'Cancelar la solicitud' : 'Solicitud cancelada' }
            leftIcon={{
              name : (item.estado == 1) ? 'delete' : 'done'
            }}
            onPress={this.handleStatusCita.bind(this)}
          />
        </List>     

        <Toast 
          ref="toast"
          position='top'
          positionValue={200}
          fadeInDuration={750}
          fadeOutDuration={1000}
          opacity={0.8}
        />
        <SolicitudModalComponent modalVisible={ modalVisible } items={ item.examenes } onPress={this.onPressModalButton} />
      </ScrollView>      
    )
  }
}