import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Animated,
  Easing,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import Container from '../components/Container';
import Button from '../components/Button';
import Label from '../components/Label';
import firebase from 'firebase';

export default class SignUp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      pass: '',
      ErrorStatus: true,
      ErrorStatusPass: true,
      isLoading: false,
      spinValue: new Animated.Value(0),
    }
  }

  componentDidMount() {
    Animated.loop(
      Animated.timing(
        this.state.spinValue,                                   // The animated value to drive
        {
          toValue: this.props.toValue || 1,                   // Animate to 360/value
          duration: this.props.duration || 2000,              // Make it take a while
          easing: Easing.linear,
          useNativeDriver: true,
        }
      )).start(this.props.onFinishedAnimating);                    // Starts the animation
  }

  onEnterText = (email) => {
    if (email.trim() != 0) {
      this.setState({ email: email, ErrorStatus: true });
    } else {
      this.setState({ email: email, ErrorStatus: false });
    }
  }

  onEnterTextPass = (pass) => {
    if (pass.trim() != 0) {
      this.setState({ pass: pass, ErrorStatusPass: true });
    } else {
      this.setState({ pass: pass, ErrorStatusPass: false });
    }
  }


  buttonClickListener = () => {
    const { email, pass } = this.state;
    if (email == "" || pass == "") {
      if (email == "" && pass == "") {
        Alert.alert("Please enter Email & Password");
        this.onEnterText(email);
        this.onEnterTextPass(pass);
      }
      else if (email == "") {
        Alert.alert("Please enter Email");
        this.onEnterText(email);
      } else if (pass == "") {
        Alert.alert("Please enter Password");
        this.onEnterTextPass(pass);
      }
    } else {
      this.setState({ isLoading: true });
      const { navigate } = this.props.navigation;
      var that = this;
      const { email, pass } = this.state;
      firebase.auth().createUserWithEmailAndPassword(email, pass)
        .then(function (newUser) {
          that.setState({ isLoading: false });
          navigate('Home');
        }).catch(function (error) {
          that.setState({ isLoading: false });
          Alert.alert(error.message);
        });
    }
  }

  buttonClickListenerCancel = () => {
    this.props.navigation.navigate('Login');
  }

  render() {
    let spin = this.state.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });
    return (
      <ScrollView style={styles.scroll}>
        {/* <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Animated.Image
            tintColor='#00BCD4'
            source={require('ReactNative_LoginPage/src/Images/react_native.png')}
            style={{ transform: [{ rotate: spin }], width: 100, height: 100, marginBottom: 20 }} />
        </View> */}
        <View style={{ marginTop: 20 }}>
          <Label text="Username or Email" />
          <TextInput
            style={styles.textInput}
            onChangeText={email => this.onEnterText(email)} />
          {this.state.ErrorStatus == false ? (
            <Text style={styles.errorMessage}>
              * Please enter email.
           </Text>
          ) : null}
        </View>

        <View style={{ marginTop: 10 }}>
          <Label text="Password" />
          <TextInput
            secureTextEntry={true}
            style={styles.textInput}
            onChangeText={pass => this.onEnterTextPass(pass)} />
          {this.state.ErrorStatusPass == false ? (
            <Text style={styles.errorMessage}>
              * Please enter password.
             </Text>
          ) : null}
        </View>

        <View style={styles.primaryButton}>
          <TouchableOpacity
            style={styles.LoginButtonStyle}
            activeOpacity={.7}
            onPress={this.buttonClickListener}>
            <View style={styles.inline}>
              {this.state.isLoading == true ? (
                <ActivityIndicator style={{ marginStart: -20, marginEnd: 20, marginTop: 10 }} color='#fff' size="large" animating={this.state.isLoading} />
              ) : null}
              <Text style={[styles.buttonWhiteText, styles.buttonBigText]}>Sign Up</Text>
            </View>
          </TouchableOpacity>
        </View>

      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({

  scroll: {
    backgroundColor: '#FFF',
    padding: 25,
    flexDirection: 'column'
  },
  label: {
    color: '#0d8898',
    fontSize: 15
  },
  alignRight: {
    height: 50,
    alignSelf: 'flex-end'
  },
  welcome: {
    fontSize: 30,
    marginTop: 50,
    color: '#333333',
    textAlign: 'center',
  },
  textInput: {
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 12,
    height: 50,
    fontSize: 18,
    backgroundColor: '#F1FCFF'
  },
  buttonWhiteText: {
    fontSize: 20,
    color: '#FFF',
  },
  buttonBigText: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  buttonBlackText: {
    fontSize: 20,
    color: '#595856'
  },
  cancelButton: {
    height: 50,
    marginBottom: 30
  },
  inline: {
    height: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  primaryButton: {
    marginTop: 50,
    flex: 1,
    justifyContent: 'center'
  },
  footer: {
    marginTop: 100
  },
  errorMessage: {
    marginTop: 2,
    fontSize: 12,
    color: "red",
  },
  LoginButtonStyle: {
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: '#00BCD4',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff'
  }
});