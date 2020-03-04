import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  Image,
  View,
  TextInput,
  ScrollView,
  Animated,
  Easing,
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import Container from '../components/Container';
import Button from '../components/Button';
import Label from '../components/Label';
import firebase from 'firebase';
// import { TouchableOpacity } from 'react-native-gesture-handler';

export default class Login extends Component {
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
    } else {/*else if(email != "hardik@gmail.com" || pass != "123456")
        {
            if(email != "hardik@gmail.com" && pass != "123456")
            {
                Alert.alert("Please enter valid Email & Password");    
            }else if(email != "hardik@gmail.com")
            {
                Alert.alert("Please enter valid Email");
            }else if(pass != "123456")
            {
                Alert.alert("Please enter valid Password");
            }
        }else
        {
            this.props.navigation.navigate('Home');
          }*/
      this.setState({ isLoading: true });
      var that = this;
      const { navigate } = this.props.navigation;
      firebase.auth().signInWithEmailAndPassword(email, pass)
        .then(function (newUser) {
          that.setState({ isLoading: false });
          navigate('Home');
        }).catch(function (error) {
          that.setState({ isLoading: false });
          Alert.alert(error.message);
        });
    }
  }

  buttonClickListenerForgot = () => {
    Alert.alert("Email : hardik@gmail.com\nPass : 123456");
  }

  buttonClickListenerSignUp = () => {
    this.props.navigation.navigate('SignUp');
  }

  render() {
    let spin = this.state.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });
    return (
      <ScrollView style={styles.scroll}>

        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Animated.Image
            tintColor='#00BCD4'
            source={require('ReactNative_LoginPage/src/Images/react_native.png')}
            style={{ transform: [{ rotate: spin }], width: 100, height: 100, marginBottom: 20 }} />
        </View>

        {/* <Container>
          <Button
            label="Forgot Login/Pass"
            styles={{ button: styles.alignRight, label: styles.label }}
            onPress={this.buttonClickListenerForgot} />
        </Container> */}

        <View style={{ marginTop: 10 }}>
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

        <Button
          label="Create new account"
          styles={{ button: styles.alignRight, label: styles.label }}
          onPress={this.buttonClickListenerSignUp}
        />

        {/* <Container>
          <Button
            styles={{ button: styles.transparentButton }}
            onPress={this.press.bind(this)}>
            <View style={styles.inline}>
              <Icon name="facebook-official" size={20} color="#3B5699" />
              <Text style={[styles.buttonBlueText, styles.buttonBigText]}>  Connect </Text>
              <Text style={styles.buttonBlueText}>with Facebook</Text>
            </View>
          </Button>
        </Container> */}

        <View style={styles.primaryButton}>
          <TouchableOpacity
            style={styles.LoginButtonStyle}
            activeOpacity={.7}
            onPress={this.buttonClickListener}>
            <View style={styles.inline}>
              {this.state.isLoading == true ? (
                <ActivityIndicator style={{ marginStart: -20, marginEnd: 20, marginTop: 10 }} color='#fff' size="large" animating={this.state.isLoading} />
              ) : null}
              <Text style={[styles.buttonWhiteText, styles.buttonBigText]}>Log In</Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* <Button
              styles={{ button: styles.primaryButton, label: styles.buttonWhiteText }}
              onPress={this.buttonClickListener}>
              <View style={styles.inline}>
                {this.state.isLoading == true ? (
                  <ActivityIndicator style={{ marginStart: -20, marginEnd: 20, marginTop: 6 }} color='#fff' size="large" animating={this.state.isLoading} />
                ) : null}
                <Text style={[styles.buttonWhiteText, styles.buttonBigText]}>Log In</Text>
              </View>
            </Button> */}

        <Container>
        </Container>

      </ScrollView>
    );
  }
  press() {
    //execute any code here
  }
}


const styles = StyleSheet.create({

  scroll: {
    backgroundColor: '#FFF',
    padding: 25,
    flexDirection: 'column'
  },
  label: {
    marginTop: 5,
    color: '#00BCD4',
    fontSize: 15
  },
  alignRight: {
    height: 20,
    alignSelf: 'flex-end'
  },
  textInput: {
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 12,
    height: 50,
    fontSize: 18,
    backgroundColor: '#F1FCFF'
  },
  transparentButton: {
    height: 50,
    borderColor: '#3B5699',
    borderWidth: 2
  },
  buttonBlueText: {
    fontSize: 18,
    color: '#3B5699'
  },
  buttonBigText: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  inline: {
    height: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonWhiteText: {
    fontSize: 20,
    color: '#FFF',
  },
  buttonBlackText: {
    fontSize: 20,
    color: '#595856'
  },
  cancelButton: {
    height: 50,
    marginBottom: 30
  },
  primaryButton: {
    marginTop: 30,
    flex: 1,
    justifyContent: 'center'
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