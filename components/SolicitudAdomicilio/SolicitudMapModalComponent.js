import React from 'react'

import { 
  Modal, View, StyleSheet, Dimensions
} from 'react-native'

import {
  Button  
} from 'react-native-elements'

import MapView, { Marker } from 'react-native-maps';

const SolicitudMapModalComponent = (props) => {
  let { width, height } = Dimensions.get('window')
  const ASPECT_RATIO = width / height
  const LATITUDE_DELTA = 60 
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

  let { lat, lng } = props.items
  state = {
    region: {
      latitude: lat,
      longitude: lng,
      latitudeDelta: 1,
      longitudeDelta: 1
    }
  }
  
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
        <MapView
          style={styles.map}
          region={this.state.region}
          showsUserLocation = {true}
          followUserLocation = {true}
          showsMyLocationButton = {true}
          zoomEnabled = {true}>
            <Marker
              coordinate={this.state.region}
              title={'Title'}
              description={'Title 1'}
            />
        </MapView>
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
  map: {
    flex: 1
  },
});

export default SolicitudMapModalComponent