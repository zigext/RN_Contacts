import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, ListView, TouchableHighlight, Alert } from 'react-native'
import { Actions } from 'react-native-router-flux'
import tcomb from 'tcomb-form-native'
import firebase from './Firebase'

const Form = tcomb.form.Form
const options = {}
// here we are: define your domain model
let newContact = tcomb.struct({
    name: tcomb.String,              // a required string
    telephone: tcomb.Number,
    address: tcomb.maybe(tcomb.String),
    email: tcomb.maybe(tcomb.String),
})

export default class AddContact extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: null
        }
    }

    getInitialState = () => {
        return { value: null }
    }

    onChange = (value) => {
        this.setState({ value })
    }

    clearForm = () => {
        // clear content from all textbox
        console.log("Clear input from")
        this.setState({ value: null })
    }

    addContact = (newContact) => {
        firebase.database().ref(`contacts/${this.props.uid}`).push(newContact).
            then((data) => {
                console.log("add to Firebase success")
                this.clearForm()
                Alert.alert(
                    'Add new contact',
                    'Add contact success',
                    [
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ],
                    { cancelable: false }
                )
                dispatch({ type: "FULFILLED" })
            }).
            catch((err) => {
                console.log("add to Firebase failed")
                this.clearForm()
                dispatch({ type: "REJECTED" })
                //error
            });
    }

    onPress = () => {
        // call getValue() to get the values of the form
        let value = this.refs.form.getValue();
        if (value) { // if validation fails, value will be null
            console.log(value);
            this.addContact(value)
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <Form
                    ref="form"
                    type={newContact}
                    options={options}
                    value={this.state.value}
                    onChange={this.onChange.bind(this)}
                />
                <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Add</Text>
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
        backgroundColor: '#ffffff',
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