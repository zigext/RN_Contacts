import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, ListView, TouchableHighlight, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux'
import ContactList from './components/ContactList'
import LogoutButton from './components/LogoutButton'
import SubscribeSwitch from './components/SubscribeSwitch'

export default class ContactsPage extends React.Component {
    constructor(props) {
        super(props)
        // this.state = { detail: false }
    }

    // init = () => {
    //     this.setState({ detail: this.props })
    // }

    //if press go back button it will go back to contactPage

    componentWillMount = async () => {
        const user = await this.fetchUser()
        console.log(user)
        console.log("PROPSSSSSSSS")
        // console.log(this.props)
        if (user) {
            console.log("IF")
            this.setState({
                user: user,
                loggedIn: true
            })
            console.log(this.state.user)
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

    render() {
        return (
            <View style={styles.container}>
                <ContactList />
                <TouchableHighlight style={[styles.button, { margin: 30 }]} onPress={this.onPress} underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Add new contact</Text>
                </TouchableHighlight>
                <LogoutButton />
                <SubscribeSwitch />
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