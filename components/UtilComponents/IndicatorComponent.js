import React from 'react'

import { 
  View, 
  ActivityIndicator 
} from 'react-native'

const IndicatorComponent = (props) => {
  return(
    <View>
      <ActivityIndicator size={'large'} color={'#68BCFF'} />
    </View>
  )
}

export default IndicatorComponent