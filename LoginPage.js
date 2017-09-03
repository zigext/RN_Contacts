import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, ListView, TouchableHighlight, Alert, FlatList, AsyncStorage, ToastAndroid, ProgressBarAndroid } from 'react-native'
import { Actions } from 'react-native-router-flux'
import tcomb from 'tcomb-form-native'
import firebase from './Firebase'
import ContactFlatList from './components/ContactFlatList'
import SubscribeSwitch from './components/SubscribeSwitch'

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
    constructor(props) {
        super(props)
        this.state = {
            user: null,
            loggedIn: false
        }
    }
    componentWillMount = async () => {
        const user = await this.fetchUser()
        console.log("NULLL ", user)
        if (user) {
            console.log("send props")
            this.setState({
                user: user,
                loggedIn: true
            })
            console.log(this.state.user)
            Actions.contactsPage({ ...this.state.user })
        }
        else {

        }
    }

    saveUser = async (user) => {
        await AsyncStorage.setItem('user', JSON.stringify({ ...user }))
        console.log("save user success")
    }

    fetchUser = async () => {
        const value = await AsyncStorage.getItem('user')
        console.log("VALUE ", value)
        if (value !== null) {
            if (value === 'null') {
                console.log("return null")
                return null
            }
            else {
                const user = JSON.parse(value)
                console.log("USER");
                console.log(user)
                return user
            }
        }
        return
    }

    saveUserToFirebase = (uid, email) => {
        firebase.database().ref(`users/${uid}`).set({email: email}).
            then((data) => {
                console.log("add user to Firebase success")
                dispatch({ type: "FULFILLED" })
            }).
            catch((err) => {
                console.log("add user to Firebase failed")
                dispatch({ type: "REJECTED" })
            });
    }

    logIn = () => {
        // call getValue() to get the values of the form
        let value = this.refs.form.getValue();

        if (value) { // if validation fails, value will be null
            console.log(value); // value here is an instance of Person

            firebase.auth().signInWithEmailAndPassword(value.email, value.password)
                .then((user) => {
                    console.log('User successfully logged in', user)
                    console.log('XXXXXXX', user._user.email)
                    console.log('YYYYYYY', user._user.uid)
                    this.saveUserToFirebase(user._user.uid,user._user.email)
                    this.saveUser(user).then(this.fetchUser())
                    ToastAndroid.showWithGravity('Log in success!', ToastAndroid.SHORT, ToastAndroid.CENTER)
                    Actions.contactsPage()
                })
                .catch((error) => {
                    //error 
                    console.error('User signin error', error);
                    ToastAndroid.showWithGravity('Email or password is incorrect', ToastAndroid.SHORT, ToastAndroid.CENTER)
                })


        }
    }
    render() {
        const progressBar =
            <View style={styles.container}>
                <ProgressBarAndroid styleAttr="Inverse" />
            </View>
        return (
            <View style={styles.container}>
                <Form
                    ref="form"
                    type={user}
                    options={options}
                />
                <TouchableHighlight style={styles.button} onPress={this.logIn} underlayColor='#99d9f4' loadingView={progressBar}>
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