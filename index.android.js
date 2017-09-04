import React, { Component } from 'react';
import {AppRegistry, StyleSheet, Text, View, ListView, AsyncStorage} from 'react-native';

// import ToDos from './components/ToDos'
import firebase from './Firebase'
import { Router, Scene } from 'react-native-router-flux'
import LoginPage from './LoginPage'
import MainPage from './MainPage'
import ContactsPage from './ContactsPage'
import AddContact from './AddContact'
import ContactFullDetail from './ContactFullDetail'

export default class fb01 extends Component { 
  render() {
    return (
      <Router>
        <Scene key='root' navigationBarStyle={{ backgroundColor: '#474045'}} titleStyle={{color: 'white'}} barButtonTextStyle={{color: 'white'}}>
          <Scene key='loginPage' component={LoginPage} title='Log in' initial={true} />
          <Scene key='contactsPage' component={ContactsPage} title='Contacts'/>
          <Scene key='addContact' component={AddContact} title='Add new contact' />
          <Scene key='contactFullDetail' component={ContactFullDetail} title='Contact full detail' />
        </Scene>
      </Router>
    );
  }


}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  }
});

AppRegistry.registerComponent('fb01', () => fb01);
