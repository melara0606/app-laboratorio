import React from 'react'
import moment from 'moment'

import {View, ScrollView, StyleSheet} from 'react-native'
import {List, Button, ListItem} from 'react-native-elements'

import { getObjectDataCitas } from '../UtilComponents/FetchServidor'
import IndicatorComponent from '../UtilComponents/IndicatorComponent'

export default class Home extends React.Component {
  state = {
    citas: [],
    isLoading: false,
    modalVisible: false
  }

  componentWillMount() {
    getObjectDataCitas().then(j => {
      this.setState({
        isLoading: false,
        citas : j
      })
    })
  }

  // onPressModal = () => {
  //   let form = this.refs.form.getValue();
  //   this.setState({ modalVisible: false })
  //   this.props.navigation.navigate('NuevaCita', {
  //     id: (form.rememberMe ? 1 : 2)
  //   })
  // }

  // onChange = (value) => {
  //   this.setState({ value, tipoSolicitud: (value.rememberMe ? 'Particular': 'Institucional') });
  // }

  render() {
    let {isLoading, citas} = this.state

    if(isLoading){
      return <IndicatorComponent />
    }
    
    return(
      <View>        
        <ScrollView>
          <List>
            {
              citas.map((item) => {
                return (
                  <ListItem
                    key={item.id} 
                    title={`${moment(item.fecha).format('LL')}`} subtitle={`${item.horario}`}
                    onPress={() => {
                      this.props.navigation.navigate('CitaDetails', { 
                        id: item.id
                      });                    
                    }}
                  />
                )
              })
            }
          </List>
        </ScrollView>
      </View>
    )
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10, 
//     marginTop: 25,
//     justifyContent:'center'
//   },
//   button: {
//     alignItems: 'center',
//     backgroundColor: '#DDDDDD',
//     padding: 15
//   }
// })