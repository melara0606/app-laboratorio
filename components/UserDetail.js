import React, { Component } from 'react'
import { 
  ScrollView, 
  View, 
  Modal,
  Text,
  StyleSheet,
  TouchableHighlight
} from 'react-native'

import { Table, Row, Rows } from 'react-native-table-component';
import { Tile, List, ListItem, Divider, Button  } from 'react-native-elements'

import { itemSolicitud, convertMoneda } from './utils'
import SpinnerComponent from './SipnnerComponent'

import moment from 'moment';

export default class UserDetail extends Component {
  state = {
    item: {},
    isLoading: false,
    modalVisible: false
  }
  componentWillMount = () => {
    let { id } = this.props.navigation.state.params
    itemSolicitud(id)
      .then(json => { this.setState({ isLoading: true, item: json.data }) })
  }
  setModalVisible = (visible) => ( this.setState({modalVisible: visible}) )

  getModal = () => {
    let i = 1;
    let state = {
      tableHead: ['Nombre', 'Categoria', 'Precio'],
      tableData: []
    }
  
    this.state.item.items.forEach(element => {
      state.tableData.push([
        element.nombre_examen, element.nombre_categoria, `$ ${convertMoneda(element.precio, 2)}`
      ])
    });
    return (
      <Modal
        animationType="slide"
        transparent={false}
        onRequestClose={() => { }}
        visible={ this.state.modalVisible }>
        <View style={styles.container}>
          <View style={{ height:60, marginBottom:15 }}>
            <Button
              onPress={() =>{ this.setModalVisible(false) }}
              backgroundColor={"#FF0040"}
              icon={{name: 'times', type: 'font-awesome'}}
              title='Cerrar' />          
          </View>
          <View>
            <Table  borderStyle={{borderWidth: 2, borderColor: '#c8e1ff',marginTop: 20}}>
              <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>
              <Rows data={state.tableData} textStyle={styles.text}/>
            </Table>          
          </View>
        </View>
      </Modal>
    )
  }

  getListData() {
    let { item } = this.state
    let estado = (item.estado == 1) ? "Iniciada" : "Cancelada"
    let type = (item.tipo_solicitud == 1) ? "Promocion" : (item.tipo_solicitud == 2) ?"Particular" : "Entidad"
    let fechaFormato = moment(item.fecha_creacion).format('LLL')

    return(
      <ScrollView>
        <Tile
          featured height={150} 
          title={`${item.nombre_sucursal}`} 
          caption={fechaFormato}
        />
        <List>
          <ListItem  title="Monto" rightTitle={`$ ${convertMoneda(item.monto, 2)}`}  hideChevron />
          <ListItem  title="Estado"  badge={{  value: estado }} hideChevron />
          <ListItem  title="Tipo de Solicitud"  badge={{  value: type }} hideChevron />          
          <ListItem  title="Mostrar Examenes" 
            onPress={() => this.setModalVisible(true)} badge={{ value: item.items.length }} />
        </List>
        { this.getModal() }
      </ScrollView>      
    )
  }
  render() {
    let state = this.state.isLoading
    if(state){
      return this.getListData()
    }else{
      return <SpinnerComponent />
    }
  }
} 

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    padding: 10,
    justifyContent: "flex-start"
  },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6, textAlign: 'center'}
});