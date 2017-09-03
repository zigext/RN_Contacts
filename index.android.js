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
  // constructor(props){
  //   super(props)
  //   this.state = {
  //     user: null,
  //     loggedIn: false
  //   }
  // }

  // componentWillMount = () => {
  //   const user = this.fetchUser()
  //   if (user) {
  //     this.setState({
  //       user: user,
  //       loggedIn: true
  //     })
  //   }
  // }

  // fetchUser = async () => {
  //   const value = await AsyncStorage.getItem('user')

  //   if(value === 'null')  return null
  //   const user = JSON.parse(value)
  //   console.log("INDEX")
  //   console.log(user)
  //   return user
  // }
 
  render() {
    return (
      <Router>
        <Scene key='root'>
          <Scene key='loginPage' component={LoginPage} title='Log in' initial={true} />
          <Scene key='contactsPage' component={ContactsPage} title='Contacts'/>
          <Scene key='addContact' component={AddContact} title='Add new contact' />
          <Scene key='contactFullDetail' component={ContactFullDetail} title='Contact full detail' />
        </Scene>
      </Router>
    );
  }
  // render() {
  //   return (
  //     <View style={styles.container}>
  //       <Text>123</Text>
  //     </View>
  //   );
  // }
  //  constructor() {
  //   super();
  //   this.ref = null;
  //   this.listView = new ListView.DataSource({
  //     rowHasChanged: (r1, r2) => r1 !== r2,
  //   });

  //   this.state = {
  //     todos: this.listView.cloneWithRows({}),
  //   };

  //   // Keep a local reference of the TODO items
  //   this.todos = {};
  // }

  // // Load the Todos on mount
  // componentDidMount() {
  //   this.ref = firebase.database().ref('todos');
  //   this.ref.on('value', this.handleToDoUpdate);
  // }

  // // Unsubscribe from the todos on unmount
  // componentWillUnmount() {
  //   if (this.ref) {
  //     this.ref.off('value', this.handleToDoUpdate);
  //   }
  // }

  // // Handle ToDo updates
  // handleToDoUpdate = (snapshot) => {
  //   this.todos = snapshot.val() || {};

  //   this.setState({
  //     todos: this.listView.cloneWithRows(this.todos),
  //   });
  // }

  // // Render a ToDo row
  // renderToDo(todo) {
  //   console.log(todo)
  //   // Dont render the todo if its complete
  //   if (todo.complete) {
  //     return null;
  //   }

  //   return (
  //     <View>
  //       <Text>{todo.title}</Text>
  //     </View>
  //   );
  // }

  //   // Render the list of ToDos with a Button
  // render() {
  //   return (
  //     <View>
  //       <ListView
  //         dataSource={this.state.todos}
  //         renderRow={(...args) => this.renderToDo(...args)}
  //       />
  //     </View>
  //   )
  // }


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
