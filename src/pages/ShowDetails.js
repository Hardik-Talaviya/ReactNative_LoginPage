import React, { Component } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, FlatList, Alert, Image, TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import Dialog from "react-native-dialog";


export default class ShowDetails extends Component {

  // You must have Firebase API keys in your environemnt for this to work!
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      empty: false,
      city: '',
      name: '',
      dialogVisible: false,
      pushid: '',
      friends: []
    }
  }

    /*
    Code based on the following database structure:
       {
        "friendships": {
          "$uid": {
            "$uid": true,
            "$uid": true
          }
        }
      }
      */

    FlatListItemSeparator = () => {
      return (
        <View
          style={{
            height: 1,
            width: "100%",
            backgroundColor: "#607D8B",
          }}
        />
      );
    }

    componentDidMount() {
      this.setState({ loading: true });
      const currentUser = firebase.auth().currentUser.uid;
      firebase.database().ref(`Details/${currentUser}`)
        .on('value', (snapshot) => {
          if (snapshot.val() != null) {
            let data = snapshot.val();
            let friends = Object.values(data);
            this.setState({ friends });
            this.setState({ loading: false });
          } else {
            this.setState({ loading: false });
            this.setState({ empty: true });
          }
        });
    }

    /* Retreive additional data such as displayname, picture, etc by using item.uid in the List Component.
    
     Code based on the following database structure:
      {
        "users": {
          "$uid": {
            "displayname": 'string value',
            "picture": 'string value'
          }
        }
      }
  
      Ex:
        const uid = item.uid;
        firebase.database().ref(users/${uid}).once('value').then(snapshot => {
          const displayname = snapshot.child('displayname').val();
          const picture = snapshot.child('picture').val();
        })
        */

    /*  renderItem({item}) {
        return (
            <ListItem item={item} />
          )
        }*/

    EditDetails = () => {
      var that = this;
      const { name, city, pushid } = this.state;
      firebase.database().ref('Details').child(firebase.auth().currentUser.uid).child(pushid).set({
        name,
        pushid,
        city
      }).then((data) => {

        that.setState({ name: '' });
        that.setState({ city: '' });
        that.setState({ pushid: '' });
        that.setState({ dialogVisible: false });

        //success callback
        // console.log('data ' , data)
      }).catch((error) => {

        //error callback
        //console.log('error ' , error)
      })
    }

    handleCancel = () => {
      this.setState({ dialogVisible: false });
    }

    EditItemImageClick(item) {
      this.setState({ dialogVisible: true });
      const currentUser = firebase.auth().currentUser.uid;
      firebase.database().ref(`Details/${currentUser}/${item}`)
        .on('value', (snapshot) => {
          if (snapshot.val() != null) {
            var Name = snapshot.child('name').val();
            var City = snapshot.child('city').val();
            var PushId = snapshot.child('pushid').val();
            this.setState({ name: Name });
            this.setState({ city: City });
            this.setState({ pushid: PushId })
          } else {
            this.setState({ loading: false });
            this.setState({ empty: true });
          }
        });

    }

    DeleteItem(item) {

      //Alert.alert(item);
      const currentUser = firebase.auth().currentUser.uid;
      Alert.alert(
        'Remove Details',
        'Are You Sure?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          { text: 'OK', onPress: () => firebase.database().ref('Details').child(currentUser).child(item).remove() },
        ],
        { cancelable: false },
      );


    }

    render() {
      if (this.state.loading) {
        return (
          <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <ActivityIndicator size="large" color="#e93766" />
          </View>
        )
      } if (this.state.empty) {
        return (
          <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <Text style={styles.welcome}>Oops! No Data Found</Text>
          </View>
        )
      }
      if (this.state.dialogVisible) {
        return (
          <Dialog.Container visible={true}>
            <Dialog.Title>Edit Details</Dialog.Title>
            <Dialog.Input label="Full Name" value={this.state.name} onChangeText={name => this.setState({ name })}
            ></Dialog.Input>
            <Dialog.Input label="City" value={this.state.city} onChangeText={city => this.setState({ city })}
            ></Dialog.Input>
            <Dialog.Button label="Cancel" onPress={this.handleCancel} />
            <Dialog.Button label="OK" onPress={this.EditDetails} />
          </Dialog.Container>
        )
      }
      return (
        <FlatList
          data={this.state.friends}
          ItemSeparatorComponent={this.FlatListItemSeparator}
          renderItem={({ item }) =>
            <View style={styles.flatview}>
              <View style={{ flexDirection: 'row', height: 100 }}>
                <View style={{ justifyContent: 'center' }}>
                  <Text style={styles.item}>Push Id:-<Text style={styles.item}>{item.pushid}</Text></Text>
                  <Text style={styles.item}>Name:-<Text style={styles.item}> {item.name} </Text></Text>
                  <Text style={styles.item}>City:-<Text style={styles.item}> {item.city} </Text></Text>
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', alignItems: 'flex-end' }}>
                  <TouchableOpacity style={{ padding: 5 }} onPress={this.DeleteItem.bind(this, item.pushid)}>
                    <Image style={{ width: 30, height: 30 }} source={require('./Img/delete.png')} />
                  </TouchableOpacity>
                  <TouchableOpacity style={{ padding: 5 }} onPress={this.EditItemImageClick.bind(this, item.pushid)}>
                    <Image style={{ width: 30, height: 30, }} source={require('./Img/edit.png')} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>}
        />
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ecf0f1',
    },
    itemTitle: {
      fontWeight: 'bold',
      fontSize: 18,
      color: 'black',
    },
    welcome: {
      fontSize: 30,
      marginTop: 50,
      marginBottom: 30,
      color: '#333333',
      textAlign: 'center',
    },
    item: {
      fontSize: 18,
      color: 'black',
    },
    flatview: {
      padding: 10,
      justifyContent: 'center',
      borderRadius: 2,
      marginTop: 5,
      marginBottom: 5,
    },
  });