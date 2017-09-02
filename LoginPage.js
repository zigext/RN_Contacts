import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, ListView, TouchableHighlight, Alert } from 'react-native'
import { Actions } from 'react-native-router-flux'
import tcomb from 'tcomb-form-native'
import firebase from './Firebase'

const Form = tcomb.form.Form
const options = {
    fields: {
        password: {
            password: true,
            secureTextEntry: true
        }
    }
}
// here we are: define your domain model
let user = tcomb.struct({
    email: tcomb.String,              // a required string
    password: tcomb.String,
})

export default class LoginPage extends Component {

    logIn = () => {
        // call getValue() to get the values of the form
        let value = this.refs.form.getValue();
        if (value) { // if validation fails, value will be null
            console.log(value); // value here is an instance of Person
            firebase.auth().signInWithEmailAndPassword(value.email, value.password)
                .then((user) => {
                    console.log('User successfully logged in', user)
                    Actions.contactsPage()
                })
                .catch((err) => {
                    console.error('User signin error', err)
                    // this.clearForm()
                })
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <Form
                    ref="form"
                    type={user}
                    options={options}
                />
                <TouchableHighlight style={styles.button} onPress={this.logIn} underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Log in</Text>
                </TouchableHighlight>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginTop: 50,
        padding: 20,
        backgroundColor: '#ffffff'
    },
    title: {
        fontSize: 30,
        alignSelf: 'center',
        marginBottom: 30
    },
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
    }
})