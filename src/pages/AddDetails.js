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

export default class AddDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      city: '',
      ErrorStatusName : true,
      ErrorStatusCity : true,
      isLoading : false,
    }
  }



onEnterText = (name) =>{
  if(name.trim() != 0){
    this.setState({name : name, ErrorStatusName : true}) ;
  }else{
    this.setState({name : name, ErrorStatusName : false}) ;
  }
}

onEnterTextPass = (city) =>{
  if(city.trim() != 0){
    this.setState({city : city, ErrorStatusCity : true}) ;
  }else{
    this.setState({city : city, ErrorStatusCity : false}) ;
  }
}

AddNewDetails = () =>{
  this.setState({ isLoading: true });
  var that=this;
  const { navigate } = this.props.navigation;
  const { name,city }  = this.state ;
  var pushid=firebase.database().ref().push().key;
  firebase.auth().onAuthStateChanged(function(user) 
  {
    if (user) 
    {
      var user = firebase.auth().currentUser;
      if(user != null)
      {
        firebase.database().ref('Details/').child(firebase.auth().currentUser.uid).child(pushid).set({
          name,
          pushid,
          city
        }).then((data)=>{
          that.setState({ isLoading: false });
          navigate('Home');
          that.setState({name:''});
          that.setState({city:''});
                    //success callback
                    // console.log('data ' , data)
                  }).catch((error)=>{
                    that.setState({ isLoading: false });
                    //error callback
                    //console.log('error ' , error)
                  })
                }
              } 
            });

}


buttonClickListenerSubmit = () =>{
  const { name,city }  = this.state ;
  if (name == "" || city == ""){
    if(name == "" && city == "")
    {
      Alert.alert("Please enter Name & City");
      this.onEnterText(name);
      this.onEnterTextPass(city);
    }
    else if(name == "")
    {
      Alert.alert("Please enter Name");
      this.onEnterText(name);
    }else if(city == "")
    {
      Alert.alert("Please enter City");
      this.onEnterTextPass(city);
    }
  }else{

    Alert.alert(
      'Add Details',
      'Are You Sure?',
      [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => this.AddNewDetails()},
      ],
      {cancelable: false},
      );



  /*this.setState({ isLoading: true });
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
              });*/
  }

}

buttonClickListenerCancel = () =>{
  this.props.navigation.navigate('Home');
  
}

          render() {
            return (
              <ScrollView style={styles.scroll}>
              <Text style={styles.welcome}>Add Details</Text>
              <View style={{marginTop:90}}/>
              <Container>
              <Label text="Full Name"/>
              <TextInput
              style={styles.textInput}
              onChangeText={name => this.onEnterText(name)}/>
              { this.state.ErrorStatusName == false ? (
               <Text style={styles.errorMessage}>
               * Please enter name.
               </Text>
               ) : null  }
               </Container>

               <Container>
               <Label text="City" />
               <TextInput
               style={styles.textInput}
               onChangeText={city => this.onEnterTextPass(city)}/>
               { this.state.ErrorStatusCity == false ? (
                 <Text style={styles.errorMessage}>
                 * Please enter city.
                 </Text>
                 ) : null  }
                 </Container>

                 { this.state.isLoading == true ? (
                  <ActivityIndicator style={{marginTop:20,marginBottom:-56}} color='#e93766' size="large" animating={this.state.isLoading}/>
                  ) : null  }


                 <View style={styles.footer}>
                 <Container>
                 <Button 
                 label="Submit"
                 styles={{button: styles.primaryButton, label: styles.buttonWhiteText}} 
                 onPress={this.buttonClickListenerSubmit} />
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
            welcome: {
              fontSize: 30,
              marginTop:50,
              color: '#333333',
              textAlign: 'center',
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