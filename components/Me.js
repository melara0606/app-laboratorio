import React, { Component } from 'react';
import { ScrollView, ActivityIndicator, View, AsyncStorage } from 'react-native';
import { Tile, List, ListItem, Button } from 'react-native-elements';
import { me } from './data/data';

export default class Me extends Component {
  state = {
    data: {},
    spinner: true
  }

  componentWillMount() {
    this.setState({ spinner: true })
    AsyncStorage.getItem('@MySuperStore:key', (err, result) => {
      this.setState({ data:  JSON.parse(result) , spinner: false })
    })
  }

  handleSettingsPress = () => {
    this.props.navigation.navigate('Settings');
  };

  getSpinnerLoggin() {
    return(
      <View>
        <ActivityIndicator size={1} color="#68BCFF" />
      </View>
    )
  }

  handleRender() {
    const { data } = this.state
    return(
      <ScrollView>
        <Tile
          imageSrc={{ require: '../assets/user.png' }}
          featured
          title={`${data.name_pac.toUpperCase()} ${data.lastname_pac.toUpperCase()}`}
          caption={data.name_ext}
        />

        <Button
          title="Opciones"
          backgroundColor={"#FF0040"}
          buttonStyle={{ marginTop: 20 }}
          onPress={this.handleSettingsPress}
        />

        <List>
          <ListItem
            title="DUI"
            rightTitle={data.dui}
            hideChevron
          />
          <ListItem
            title="Carnet"
            rightTitle={data.carnet}
            hideChevron
          />
          <ListItem
            title="Telefono"
            rightTitle={data.telefono}
            hideChevron
          />
        </List>

        <List>
          <ListItem
            title="Usuario"
            rightTitle={data.codigo_paciente}
            hideChevron
          />
        </List>

        <List>
          <ListItem
            title="Fecha de Nacimiento"
            rightTitle={data.date_pac}
            hideChevron
          />
          <ListItem
            title="Direccion"
            rightTitle={data.address_pac}
            hideChevron
          />
        </List>
      </ScrollView>
    );
  }

  render() {
    const spinner = this.state.spinner;
    return (
      <View>
        { spinner ? this.getSpinnerLoggin() : this.handleRender() }
      </View>
    );
  }
}

Me.defaultProps = { ...me };