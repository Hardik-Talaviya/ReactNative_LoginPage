import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ActivityIndicator,
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
      ErrorStatus : true,
      ErrorStatusPass : true,
      isLoading : false,
    }
  }



  onEnterText = (email) =>{
   if(email.trim() != 0){
    this.setState({email : email, ErrorStatus : true}) ;
  }else{
    this.setState({email : email, ErrorStatus : false}) ;
  }
}

onEnterTextPass = (pass) =>{
 if(pass.trim() != 0){
  this.setState({pass : pass, ErrorStatusPass : true}) ;
}else{
  this.setState({pass : pass, ErrorStatusPass : false}) ;
}
}


buttonClickListener = () =>{
  const { email,pass }  = this.state ;
  if (email == "" || pass == ""){
    if(email == "" && pass == "")
    {
      Alert.alert("Please enter Email & Password");
      this.onEnterText(email);
      this.onEnterTextPass(pass);
    }
    else if(email == "")
    {
      Alert.alert("Please enter Email");
      this.onEnterText(email);
    }else if(pass == "")
    {
      Alert.alert("Please enter Password");
      this.onEnterTextPass(pass);
    }
  }else{
    this.setState({ isLoading: true });
    const { navigate } = this.props.navigation;
    var that=this;
    const { email,pass }  = this.state ;
    firebase.auth().createUserWithEmailAndPassword(email, pass)
    .then(function(newUser) {
      that.setState({ isLoading: false });
      navigate('Home');
    }).catch(function(error){
      that.setState({ isLoading: false });
      Alert.alert(error.message);
    });
  }
}

buttonClickListenerCancel = () =>{
  this.props.navigation.navigate('Login');
}

render() {
  return (
    <ScrollView style={styles.scroll}>
    <Text style={styles.welcome}>Sign Up</Text>
    <View style={{marginTop:90}}/>
    <Container>
    <Label text="Username or Email"/>
    <TextInput
    style={styles.textInput}
    onChangeText={email => this.onEnterText(email)}/>
    { this.state.ErrorStatus == false ? (
     <Text style={styles.errorMessage}>
     * Please enter email.
     </Text>
     ) : null  }
     </Container>

     <Container>
     <Label text="Password" />
     <TextInput
     secureTextEntry={true}
     style={styles.textInput}
     onChangeText={pass => this.onEnterTextPass(pass)}/>
     { this.state.ErrorStatusPass == false ? (
       <Text style={styles.errorMessage}>
       * Please enter password.
       </Text>
       ) : null  }
       </Container>

       { this.state.isLoading == true ? (
        <ActivityIndicator style={{marginTop:20,marginBottom:-56}} color='#e93766' size="large" animating={this.state.isLoading}/>
        ) : null  }


       <View style={styles.footer}>
       <Container>
       <Button 
       label="Sign Up"
       styles={{button: styles.primaryButton, label: styles.buttonWhiteText}} 
       onPress={this.buttonClickListener} />
       </Container>
       <Container>
       <Button 
       label="CANCEL"
       styles={{button: styles.cancelButton,label: styles.buttonBlackText}} 
       onPress={this.buttonClickListenerCancel} />
       </Container>
       </View>

       </ScrollView>
       );
     }
   }


   const styles = StyleSheet.create({
     
     scroll: {
      backgroundColor: '#E1D7D8',
      padding: 25,
      flexDirection: 'column'
    },
    label: {
      color: '#0d8898',
      fontSize: 15
    },
    alignRight: {
      height:50,
      alignSelf: 'flex-end'
    },
    welcome: {
      fontSize: 30,
      marginTop:50,
      color: '#333333',
      textAlign: 'center',
    },
    textInput: {
     paddingLeft:20,
     paddingRight:20,
     borderRadius: 25,
     height: 50,
     fontSize: 20,
     backgroundColor: '#FFF'
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
    height:50,
    marginBottom:30
  },
  primaryButton: {
   height:50,
   backgroundColor: '#34A853'
 },
 footer: {
   marginTop: 100
 },
 errorMessage: {
  marginTop:2,
  fontSize: 15,
  color:"red",
}

});