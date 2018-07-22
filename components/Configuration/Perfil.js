import React from 'react';
import { ScrollView } from 'react-native';
import { Tile, List, ListItem, Button } from 'react-native-elements';

export default class Perfil extends React.Component {
  state = {
    data: {}
  }

  componentWillMount() {
    let { credentials } = global
    this.setState({ data:  JSON.parse(credentials) })
  }

  handlerEvent = () => {
    this.props.navigation.navigate('Settings')
  }

  render() {
    const { data } = this.state
    return(
      <ScrollView>
        <Tile
          imageSrc={{ require: '../assets/user.png' }} featured caption={data.name_ext}
          title={`${data.name_pac.toUpperCase()} ${data.lastname_pac.toUpperCase()}`}          
        />

        <Button
          title="Configuraciones" backgroundColor={"#FF0040"}  buttonStyle={{ marginTop: 20 }}
          onPress={this.handlerEvent}
        />

        <List>
          <ListItem
            title="DUI" rightTitle={data.dui} hideChevron
          />
          <ListItem
            title="Carnet" rightTitle={data.carnet} hideChevron
          />
          <ListItem
            title="Telefono" rightTitle={data.telefono} hideChevron
          />
        </List>

        <List>
          <ListItem title="Usuario" rightTitle={data.codigo_paciente} hideChevron />
        </List>

        <List>
          <ListItem
            title="Fecha de Nacimiento" rightTitle={data.date_pac} hideChevron
          />
          <ListItem
            title="Direccion" rightTitle={data.address_pac} hideChevron
          />
        </List>
      </ScrollView>
    );
  }
}