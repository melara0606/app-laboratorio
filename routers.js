import React from 'react'

import { 
  TabNavigator, StackNavigator 
} from 'react-navigation'

import { Icon } from 'react-native-elements'

import Portada from './components/Portada'
import Login from './components/Login/Login'

import SolicitudComponent from './components/Solicitudes/SolicitudComponent'
import SolicitudDetailComponent from './components/Solicitudes/SolicitudDetailComponent'

import CitasComponent from './components/Citas/CitasComponent'

// Perfil y configuraciones
import Perfil from './components/Configuration/Perfil'
import Configuraciones from './components/Configuration/Configuraciones'

import SolicitudAdomicilio from './components/SolicitudAdomicilio/SolicitudAdomicilioComponent'

export const ConfiguracionStack = StackNavigator({
  Configuracion: {
    screen: Configuraciones,
    navigationOptions: {
      title: 'Opciones',
    },
  },
});

export const SolicitudStack = StackNavigator({
  Solicitud: {
    screen: SolicitudComponent,
    navigationOptions: {
      title: 'Solicitudes',
    },
  },
  Details: {
    screen: SolicitudDetailComponent,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.id}`,
    }),
  }
});

export const CitasStack = StackNavigator({
  Citas: {
    screen: CitasComponent,
    navigationOptions: {
      title: 'Citas',
    },
  },
  // Details: {
  //   screen: CitasDetailComponent,
  //   navigationOptions: ({ navigation }) => ({
  //     title: `${navigation.state.params.id}`,
  //   }),
  // }
});

export const Tabs = TabNavigator(
  {
    Solicitud: {
      screen: SolicitudStack,
      navigationOptions: {
        tabBarLabel: 'Solicitudes',
        tabBarIcon: ({ tintColor }) => <Icon name='ios-list' type='ionicon' color='white' />
      },
    },
    Citas: {
      screen: CitasStack,
      navigationOptions: {
        tabBarLabel: 'Citas',
      }
    },
    SolicitudAdomicilio: {
      screen: SolicitudAdomicilioStack,
      navigationOptions: {
        tabBarLabel: 'Solicitudes Adomicilio',
        tabBarIcon: ({ tintColor }) => <Icon name='ios-list' type='ionicon' color='white' />
      },
    },
    Perfil: {
      screen: Perfil,
      navigationOptions: {
        tabBarLabel: 'Perfil',
        tabBarIcon: ({ tintColor }) => <Icon name='ios-settings' type='ionicon' color='white' />
      }
    }
  }, {
    swipeEnabled: true,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: '#00695f',
      activeBackgroundColor: "#2EC4B6",
      inactiveTintColor: '#00695f',
      showIcon: true,
      showLabel: false
    }
});

export default StackNavigator({
  Login: {
    screen: Login,
  },
  Portada: {
    screen: Portada
  },
  Tabs: {
    screen: Tabs,
  },
  Settings: {
    screen: ConfiguracionStack
  }
},{
  mode: 'modal',
  headerMode: 'none',
  activeTintColor: '#F44336',
  initialRouteName: 'Portada'
});