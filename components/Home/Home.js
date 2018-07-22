import React from 'react'

import { 
  URL_BASE 
} from '../utils';

import { 
  View, 
  Modal,
  ScrollView, 
  AsyncStorage, 
  StyleSheet,
  TouchableOpacity,
  Text
} from 'react-native';

import { 
  List, 
  ListItem, 
  Button 
} from 'react-native-elements';

import moment from 'moment';
import SpinnerComponent from '../SipnnerComponent';

// Para el formulario
var t = require('tcomb-form-native');
var Form = t.form.Form;

var Person = t.struct({
  rememberMe: t.Boolean
});

var options = {
  fields: {
    rememberMe: {
      label: 'Particular'
    }
  }
};

export default class Home extends React.Component {
  state = {
    value: null,
    isLoading: false,
    modalVisible: false,
    tipoSolicitud: 'Institucional'
  }

  componentWillMount() {
    AsyncStorage.getItem('@MySuperStore:key', (err, results) => {
      let parse = JSON.parse(results)
      fetch(`${URL_BASE}/movil/citas`, {
        method: 'POST',
        body: JSON.stringify({
          id: parse.id
        })
      }).then(response => response.json())
        .then(json => this.setState({ citas: json.data, isLoading: true }))
    })
  }

  onPressModal = () => {
    let form = this.refs.form.getValue();
    this.setState({ modalVisible: false })
    this.props.navigation.navigate('NuevaCita', {
      id: (form.rememberMe ? 1 : 2)
    })
  }

  onChange = (value) => {
    this.setState({ value, tipoSolicitud: (value.rememberMe ? 'Particular': 'Institucional') });
  }

  render() {
    let {isLoading} = this.state
    if(isLoading){
      let { citas, tipoSolicitud } = this.state
      return(
        <View>
          <View>
            <Button onPress={() => this.setState({ modalVisible: true }) } title='Crear Cita' style={{ marginTop: 15 }} />
          </View>
          <ScrollView>
            <List>
              {citas.map((item) => {
                let estado = (item.estado == 1) ? "Iniciada" : "Cancelada"
                return (
                  <ListItem
                    key={item.id}
                    badge={{ value: estado }}
                    title={`${moment(item.fecha).format('LL')}`}
                    subtitle={`${item.horario}`}
                  />
                )
              })}
            </List>
          </ScrollView>
          <Modal
            animationType="slide"
            transparent={false}
            visible={ this.state.modalVisible }>
            <View style={styles.container}>
              <View style={{ alignItems:'center' }}>
                <Text style={{fontSize: 20 }}>Tipo de cita: {tipoSolicitud}  </Text>
                <Form
                  ref="form"
                  type={Person}
                  options={options}
                  value={this.state.value}
                  onChange={this.onChange}
                />
              </View>
              <TouchableOpacity style={styles.button} onPress={this.onPressModal} underlayColor='#99d9f4'>
                <Text>Crear</Text>
              </TouchableOpacity>
            </View>            
          </Modal>
        </View>
      )
    }else{
      return <SpinnerComponent />
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10, 
    marginTop: 25,
    justifyContent:'center'
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 15
  }
})