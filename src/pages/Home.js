/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ActivityIndicator, ScrollView, Alert, TouchableOpacity } from 'react-native';
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
          <Text style={{ fontSize: 25, color: '#333333' }}>To</Text>
          {/* <Text style={styles.welcome}>first project</Text>
          <Text style={styles.welcome}>using</Text> */}
          <Text style={styles.instructions}>React Native Project</Text>

        </View>

        <View style={styles.inlineButton}>

          <View style={styles.firstButtonRow}>
            <TouchableOpacity
              style={styles.LoginButtonStyle}
              activeOpacity={.7}
              onPress={this.buttonClickListenerAddDetails}>
              <View style={styles.inline}>
                <Text style={[styles.buttonWhiteText, styles.buttonBigText]}>Add Details</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.firstButtonRow}>
            <TouchableOpacity
              style={styles.LoginButtonStyle}
              activeOpacity={.7}
              onPress={this.buttonClickListenerShowDetails}>
              <View style={styles.inline}>
                <Text style={[styles.buttonWhiteText, styles.buttonBigText]}>Show Details</Text>
              </View>
            </TouchableOpacity>
          </View>

        </View>
        <View style={styles.inlineButton}>

          <View style={styles.secondButtonRow}>
            <TouchableOpacity
              style={styles.LoginButtonStyle}
              activeOpacity={.7}
              onPress={this.buttonClickListenerShowMap}>
              <View style={styles.inline}>
                <Text style={[styles.buttonWhiteText, styles.buttonBigText]}>Show Map</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.secondButtonRow}>
            <TouchableOpacity
              style={styles.LoginButtonStyle}
              activeOpacity={.7}
              onPress={this.buttonClickListener}>
              <View style={styles.inline}>
                {this.state.isLoading == true ? (
                  <ActivityIndicator style={{ marginStart: -20, marginEnd: 20, marginTop: 10 }} color='#fff' size="large" animating={this.state.isLoading} />
                ) : null}
                <Text style={[styles.buttonWhiteText, styles.buttonBigText]}>Log Out</Text>
              </View>
            </TouchableOpacity>
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
    backgroundColor: '#FFF',
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
  inline: {
    height: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inlineButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  firstButtonRow: {
    marginTop: 50,
    flex: 1,
    justifyContent: 'center'
  },
  secondButtonRow: {
    marginTop: 20,
    flex: 1,
    justifyContent: 'center'
  },
  buttonWhiteText: {
    fontSize: 20,
    color: '#FFF',
  },
  buttonBigText: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  LoginButtonStyle: {
    paddingTop: 10,
    paddingBottom: 10,
    marginRight:5,
    marginLeft:5,
    backgroundColor: '#00BCD4',
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#fff'
  }
});
