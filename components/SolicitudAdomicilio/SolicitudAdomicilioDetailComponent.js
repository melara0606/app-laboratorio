import React from 'react'

import { 
  ScrollView
} from 'react-native'

import { List, ListItem } from 'react-native-elements'

import Toast from 'react-native-easy-toast'

import IndicatorComponent from '../UtilComponents/IndicatorComponent'
import { getObjectDataSolicitudAdomicilioItem, convertMoneda, updatesolicitudAdomicilioStatus } from '../UtilComponents/FetchServidor'
import SolicitudModalComponent from '../Solicitudes/SolicitudModalComponent'
import SolicitudMapModalComponent from './SolicitudMapModalComponent'

export default class CitasDetailComponent extends React.Component {
  state = {
    item: {},
    isLoading: true,
    modalVisible: false,
    modalMapVisible: false
  }

  onPressModalButton = () => {
    this.setState({
      modalVisible: false
    })
  }

  onPressModalMapButton = () => {
    this.setState({
      modalMapVisible: false
    })
  }

  handleStatusCita() {
    let {item} = this.state
    if(item.estado == 1){
      let { id } = this.props.navigation.state.params   
      updatesolicitudAdomicilioStatus(id).then(j => {
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

    getObjectDataSolicitudAdomicilioItem(id).then(j => {
      this.setState({
        item: j.data,
        isLoading: false
      })
    })
  }
  
  render() {
    if(this.state.isLoading) 
      return <IndicatorComponent />

    let { item, modalVisible, modalMapVisible } = this.state
    let estado = (item.estado == 1) ? "Iniciada" : "Cancelada"

    return(
      <ScrollView>
        <List>
          <ListItem  title="Codigo" rightTitle={`${item.codigo}`}  hideChevron />
          <ListItem  title="Sucursal" rightTitle={`${item.nombre_sucursal}`}  hideChevron />
          <ListItem  title="Pagar" rightTitle={`$ ${convertMoneda(item.pagar, 2)}`}  hideChevron />
          <ListItem  title="Estado" rightTitle={`${estado}`}  hideChevron />

          <ListItem badge={{ value: item.examenes.length }}  
            onPress={() => this.setState({ modalVisible: true }) }
            title="Mostrar Examenes" 
          />
        </List>

        <List>
          <ListItem
            chevronColor="white"
            title={ (item.estado == 1) ? 'Cancelar la solicitud' : 'Solicitud cancelada' }
            leftIcon={{
              name : (item.estado == 1) ? 'delete' : 'done'
            }}
            onPress={this.handleStatusCita.bind(this)}
          />
          <ListItem
            chevronColor="white"
            title='Ver Ubicacion'            
            onPress={ () => {
              this.setState({
                modalMapVisible: true
              })
            }}
          />
        </List> 

        <SolicitudModalComponent modalVisible={ modalVisible } items={ item.examenes } onPress={this.onPressModalButton} />   
        <SolicitudMapModalComponent modalVisible={ modalMapVisible } items={ item } onPress={this.onPressModalMapButton} /> 

        <Toast 
          ref="toast"
          position='top'
          positionValue={200}
          fadeInDuration={750}
          fadeOutDuration={1000}
          opacity={0.8}
        />
        
      </ScrollView>      
    )
  }
}