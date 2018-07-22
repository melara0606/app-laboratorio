import React from 'react'
import { 
  View, 
  AsyncStorage, 
  StyleSheet
} from 'react-native';

import t from 'tcomb-form-native';
import { URL_BASE } from '../utils';
import SpinnerComponent from '../SipnnerComponent';

const Country = t.enums({
  'IT': 'Italy',
  'US': 'Unisted States'
}, 'Country');

export default class Home extends React.Component {
  state = {
    isLoading: false,
    value: {},
    type: this.getType({})
  }
  componentWillMount() {
    AsyncStorage.getItem('@MySuperStore:key', (err, results) => {
      let parse = JSON.parse(results)
      fetch(`${URL_BASE}/movil/citas/datos`, {
        method: 'POST',
        body: JSON.stringify({
          id: parse.id
        })
      }).then(response => response.json())
        .then(json => this.setState({ datos: json.response, isLoading: true }))
    })
  }
  getType(value) {
    if (value.country === 'IT') {
      return t.struct({
        country: Country,
        rememebrMe: t.Boolean
      });
    } else if (value.country === 'US') {
      return t.struct({
        country: Country,
        name: t.String
      });
    } else {
      return t.struct({
        country: Country
      });
    }
  }
  onChange(value) {
    const type = value.country !== this.state.value.country ? this.getType(value) : this.state.type;
    this.setState({ value, type });
  }
  render() {
    let { id } = this.props.navigation.state.params
    if(this.state.isLoading){
      return(
        <View>
          <t.form.Form
            ref="form"
            type={this.state.type}
            value={this.state.value}
            onChange={this.onChange.bind(this)}
          />                              
        </View>
      )   
    }else{
      return <SpinnerComponent />
    } 
  }
}