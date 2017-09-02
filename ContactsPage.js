import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, ListView, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux'
import ContactList from './components/ContactList'
import LogoutButton from './components/LogoutButton'

export default class ContactsPage extends React.Component {
    // constructor(props){
    //     super(props)
    //     // this.state = { detail: false }
    // }

    // init = () => {
    //     this.setState({ detail: this.props })
    // }

    onPress = () => {
        Actions.addContact()
    }
    
    render() {
        return (
            <View style={styles.container}>
                <ContactList />
                <TouchableHighlight style={[styles.button, {margin: 30}]} onPress={this.onPress} underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Add new contact</Text>
                </TouchableHighlight>
                <LogoutButton />
            </View>
        
        )
    }
}

const styles = StyleSheet.create({
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    button: {
        height: 36,
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
     container: {
        justifyContent: 'center',
        flex:1
    }
})