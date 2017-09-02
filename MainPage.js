// import React, { Component } from 'react';
// import { StyleSheet, Text, View, Button, ListView, TouchableHighlight } from 'react-native';
// import { Actions } from 'react-native-router-flux'
// import ContactList from './components/ContactList'


// export default class MainPage extends React.Component {
//     onPress = () => {
//         Actions.addContact()
//     }

//     render() {
//         return (
//             <View>
//                 <ContactList />
//                 <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
//                     <Text style={styles.buttonText}>Add new contact</Text>
//                 </TouchableHighlight>
//             </View>
//         )
//     }
// }

// const styles = StyleSheet.create({
//     buttonText: {
//         fontSize: 18,
//         color: 'white',
//         alignSelf: 'center'
//     },
//     button: {
//         height: 36,
//         backgroundColor: '#48BBEC',
//         borderColor: '#48BBEC',
//         borderWidth: 1,
//         borderRadius: 8,
//         marginBottom: 10,
//         alignSelf: 'stretch',
//         justifyContent: 'center'
//     }
// })