import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import firebase from 'firebase';

export default class Loading extends React.Component {
    componentDidMount() {
       let config = {
      apiKey: "AIzaSyAp0m02FAnJJ8bBFrgg_QbEl4ICgmsgpnU",
    authDomain: "reactnative-demo-276bf.firebaseapp.com",
    databaseURL: "https://reactnative-demo-276bf.firebaseio.com",
    projectId: "reactnative-demo-276bf",
    storageBucket: "reactnative-demo-276bf.appspot.com",
    messagingSenderId: "487966421337"
    };
    if (!firebase.apps.length) {
    try {
        firebase.initializeApp(config);
    } catch (err) {
        
    }
}
    
    firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? 'Home' : 'Login')
    })
}
  render() {
    return (
      <View style={styles.container}><Text style={{color:'#e93766', fontSize: 40}}>Loading</Text><ActivityIndicator color='#e93766' size="large" /></View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})