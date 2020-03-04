/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ActivityIndicator, ScrollView, Alert } from 'react-native';
import Container from '../components/Container';
import Button from '../components/Button';
import firebase from 'firebase';

/*const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
  });*/

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      myEmail: '',
    }
  }
  componentWillMount() {
    var that = this;
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        var user = firebase.auth().currentUser;
        if (user != null) {
          var Email = user.email;
          that.setState({ myEmail: Email });
        }
      }
    });
  }

  buttonClickListenerAddDetails = () => {
    this.props.navigation.navigate('AddDetails');
  }

  buttonClickListenerShowMap = () => {
    this.props.navigation.navigate('ShowMap');
  }

  buttonClickListenerShowDetails = () => {
    this.props.navigation.navigate('ShowDetails');
  }


  buttonClickListener = () => {
    this.setState({ isLoading: true });
    var that = this;
    const { navigate } = this.props.navigation;
    firebase.auth().signOut().then(function () {
      // Sign-out successful.
      that.setState({ isLoading: false });
      navigate('Login');
    }).catch(function (error) {
      // An error happened.
      that.setState({ isLoading: false });
      Alert.alert(error.message);
    });
  }

  render() {
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <Text style={styles.welcome}>Welcome</Text>
          <Text style={styles.instructions}>{this.state.myEmail}</Text>
          <Text style={{ marginTop: 50, fontSize: 25, color: '#333333' }}>This is my</Text>
          <Text style={styles.welcome}>first project</Text>
          <Text style={styles.welcome}>using</Text>
          <Text style={styles.instructions}>React Native</Text>

          {this.state.isLoading == true ? (
            <ActivityIndicator style={{ marginTop: 5, marginBottom: -41 }} color='#e93766' size="large" animating={this.state.isLoading} />
          ) : null}

          <View style={[{ width: "60%" }]}>

            <Button
              label="Add Details"
              styles={{ button: styles.FirstButton, label: styles.buttonWhiteText }}
              onPress={this.buttonClickListenerAddDetails} />

            <Button
              label="Show Details"
              styles={{ button: styles.primaryButton, label: styles.buttonWhiteText }}
              onPress={this.buttonClickListenerShowDetails} />

            <Button
              label="Show Map"
              styles={{ button: styles.primaryButton, label: styles.buttonWhiteText }}
              onPress={this.buttonClickListenerShowMap} />

            <Button
              label="Log Out"
              styles={{ button: styles.primaryButton, label: styles.buttonWhiteText }}
              onPress={this.buttonClickListener} />
          </View>
        </View>
      </ScrollView>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 25,
    color: '#333333',
    textAlign: 'center',
  },
  instructions: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#ff0000',
  },
  footer: {
    marginTop: 100
  },
  FirstButton: {
    marginTop: 30,
    marginBottom: 30,
    height: 50,
    backgroundColor: '#34A853'
  },
  primaryButton: {
    marginBottom: 30,
    height: 50,
    backgroundColor: '#34A853'
  },
  buttonWhiteText: {
    fontSize: 20,
    color: '#FFF',
  },
});
