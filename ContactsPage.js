import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, ListView, TouchableHighlight, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux'
import ContactList from './components/ContactList'
import LogoutButton from './components/LogoutButton'
import SubscribeSwitch from './components/SubscribeSwitch'
import firebase from './Firebase'

export default class ContactsPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentUser: null,
            subscribe: false
        }
    }

    componentWillMount = async () => {
        const currentUser = this.getCurrentUser()
        console.log("current user ", currentUser)
        if (currentUser) {
            this.setState({
                currentUser: currentUser
            })
        }
        const user = await this.fetchUser()
        console.log(user)
        if (user) {
            console.log("IF")
            this.setState({
                user: user,
                loggedIn: true
            })
        }
        else {
            Actions.loginPage()
        }
    }

    fetchUser = async () => {
        console.log("CONTACT PAGE")
        const value = await AsyncStorage.getItem('user')
        if (value !== null) {
            if (value === 'null') {
                return null
            }
            else {
                const user = JSON.parse(value)
                return user
            }
        }
        return

    }

    onPress = () => {
        Actions.addContact()
    }

    getCurrentUser = () => {
        const user = firebase.auth().currentUser
        return user
    }

    getUserSubscribe = (uid) => {
        this.ref = firebase.database().ref(`users/${uid}`)
        this.ref.on('value', this.handleSubscribeUpdate)
    }

    // Load the subscribe on mount
    componentDidMount() {
        this.getUserSubscribe(this.state.currentUser._user.uid)
    }

    // Handle subscribe updates
    handleSubscribeUpdate = (snapshot) => {
        let subscribe = snapshot.child('subscribe').val()
        if (subscribe !== null) {
            this.setState({
                subscribe
            })
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ContactList uid={this.state.currentUser._user.uid} />
                <TouchableHighlight style={[styles.button, { margin: 30 }]} onPress={this.onPress} underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Add new contact</Text>
                </TouchableHighlight>
                <LogoutButton />
                <View style={{flexDirection: 'column', margin: 10, marginRight: 20}}>
                    <Text style={{fontSize: 17, color: 'grey', alignSelf: 'flex-end'}}>Subscribe </Text>
                    <SubscribeSwitch subscribe={this.state.subscribe} />
                </View>
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
        flex: 1
    }
})