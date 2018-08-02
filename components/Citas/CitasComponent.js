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
    modalVisible: true
  }

  componentWillMount() {
    getObjectDataCitas().then(j => {
      this.setState({
        isLoading: false,
        citas : j
      })
    })
  }

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