import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet, Animated, Easing } from 'react-native'
import firebase from 'firebase';

export default class Loading extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      spinValue: new Animated.Value(0),
    }
  }

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

    Animated.loop(
      Animated.timing(
        this.state.spinValue,                                   // The animated value to drive
        {
          toValue: this.props.toValue || 1,                   // Animate to 360/value
          duration: this.props.duration || 2000,              // Make it take a while
          easing: Easing.linear,
          useNativeDriver: true,
        }
      )).start(this.props.onFinishedAnimating);
  }
  render() {
    let spin = this.state.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });
    return (
      <View style={styles.container}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Animated.Image
            tintColor='#00BCD4'
            source={require('ReactNative_LoginPage/src/Images/react_native.png')}
            style={{ transform: [{ rotate: spin }], width: 100, height: 100 }} />
        </View>
        <Text style={{ color: '#00BCD4', fontSize: 30, fontWeight: 'bold' }}>Splash Screen</Text>
      </View>
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