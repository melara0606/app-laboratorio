import React from 'react'
import { 
  TabNavigator, 
  StackNavigator 
} from 'react-navigation'

import { Icon } from 'react-native-elements'

//Component Initial
import Initial from './components/Initial'

// Componentes
import Login from './components/Login/Login'
import Home from './components/Home/Home'

import Me from './components/Me'
import Feed from './components/Feed'
import Settings from './components/Settings'
import UserDetail from './components/UserDetail'

// para las citas
import NuevaCita from './components/Home/NuevaCita'

export const FeedStack = StackNavigator({
  Feed: {
    screen: Feed,
    navigationOptions: {
      title: 'Solicitudes',
    },
  },
  Details: {
    screen: UserDetail,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.id}`,
    }),
  },
});

export const Citas = StackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      title: 'Citas',
    },
  },
  NuevaCita: {
    screen: NuevaCita,
    navigationOptions: {
      title: 'Nueva Cita'
    }
  }
});

export const SettingsStack = StackNavigator({
  Settings: {
    screen: Settings,
    navigationOptions: {
      title: 'Opciones',
    },
  },
});

export const Tabs = TabNavigator(
  {
    Feed: {
      screen: FeedStack,
      navigationOptions: {
        tabBarLabel: 'Solicitudes',
        tabBarIcon: ({ tintColor }) => <Icon name='ios-list' type='ionicon' color='white' />
      },
    },
    Citas: {
      screen: Citas,
      navigationOptions: {
        tabBarLabel: 'Citas',      
        tabBarIcon: ({ tintColor }) => <Icon name='ios-keypad' type='ionicon' color='white' />
      }
    },
    Me: {
      screen: Me,
      navigationOptions: {
        tabBarLabel: 'Configuracion',
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
  Initial: {
    screen: Initial
  },
  Tabs: {
    screen: Tabs,
  },
  Settings: {
    screen: SettingsStack,
  },
},{
  mode: 'modal',
  headerMode: 'none',
  activeTintColor: '#F44336',
  initialRouteName: 'Initial'
});