import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, TouchableHighlight, AsyncStorage } from 'react-native'
import { Actions } from 'react-native-router-flux'
import tcomb from 'tcomb-form-native'
import firebase from '../Firebase'


export default class LogoutButton extends Component {

    saveUser = async (user) => {
        await AsyncStorage.setItem('user', 'null')
        console.log("save user to null")
    }

    logOut = () => {
        firebase.auth().signOut()
            .then(() => {
                console.log('User signed out successfully')
                this.saveUser()
                Actions.loginPage()
            })
            .catch()
    }
    render() {
        return (
            <TouchableHighlight style={styles.button} onPress={this.logOut} underlayColor='#99d9f4'>
                <Text style={styles.buttonText}>Log out</Text>
            </TouchableHighlight>
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
        backgroundColor: '#2568c6',
        borderColor: '#2568c6',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center',
        marginHorizontal: 30
    }
})