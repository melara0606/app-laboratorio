import React from 'react'

import { 
  Modal, View, StyleSheet, 
} from 'react-native'

import {
  Button  
} from 'react-native-elements'

import { 
  Table, Row, Rows 
} from 'react-native-table-component'

import { convertMoneda } from '../UtilComponents/FetchServidor'

const SolicitudModalComponent = (props) => {
  let i = 1
  let state = {
    tableHead: ['Nombre', 'Categoria', 'Precio'],
    tableData: []
  }

  props.items.forEach(element => {
    state.tableData.push([
      element.nombre_examen, element.nombre_categoria, `$ ${convertMoneda(element.precio, 2)}`
    ])
  });

  return (
    <Modal
      animationType="slide"
      transparent={false}
      onRequestClose={() => { }}
      visible={ props.modalVisible }>
      <View style={styles.container}>
        <View style={{ height:60, marginBottom:15 }}>
          <Button
            onPress={props.onPress}
            style={{ marginTop: 15 }}
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

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    padding: 10,
    justifyContent: "flex-start"
  },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6, textAlign: 'center'}
});

export default SolicitudModalComponent