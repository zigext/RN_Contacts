import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, TouchableHighlight, Switch } from 'react-native'
import firebase from '../Firebase'


export default class SubscribeSwitch extends Component {
    constructor(props) {
        super(props)
        this.ref = null
        this.state = {
            subscribe: false,
            prevSubscribe: false
        }
    }

    //this.state.subscribe used to update value of switch
    //this.state.prevSubscribe used to update subscribe value in database

    getUserSubscribe = async (uid) => {
        console.log("get subscribe ")
        this.ref = firebase.database().ref(`users/${uid}`)
        this.ref.on('value', this.handleSubscribeUpdate)
    }

    // Load the subscribe on mount
    componentDidMount = async () => {
        await this.getUserSubscribe(this.props.uid)
    }

    //called autometically when subscribe value in database changed
    // Handle subscribe updates
    handleSubscribeUpdate = async (snapshot) => {
        let subscribe = snapshot.child('subscribe').val()
        if (subscribe !== null) {
            console.log("PREV before set ", this.state.prevSubscribe)
            await this.setState({
                subscribe,
                prevSubscribe: subscribe
            })
            console.log("SET SUBSCRIBE if != null ", this.state.subscribe)
            console.log("PREV after set ", this.state.prevSubscribe)
        }
        console.log("handle update SUBSCRIBE ")
    }

    toggleSwitch = async (value) => {
        await this.setState({ prevSubscribe: !this.state.prevSubscribe })
        console.log("toggle ", this.state.prevSubscribe)
        if (this.state.prevSubscribe) {
            this.subscribeToTopic()
        }
        else {
            this.unsubscribeFromTopic()
        }
    }

    subscribeToTopic = () => {
        console.log("Subscribe to topic contacts")
        this.setState({
            subscribe: true
        })
        firebase.messaging().subscribeToTopic('contacts')
        firebase.messaging().onMessage((message) => {
            console.log("onmessage ", message)
        })
        this.updateSubscribeInFirebase()
    }

    unsubscribeFromTopic = () => {
        console.log("Unsubscribe from topic contacts")
        this.setState({
            subscribe: false
        })
        this.updateSubscribeInFirebase()
        firebase.messaging().unsubscribeFromTopic('contacts')
    }

    //update subscribe value
    updateSubscribeInFirebase = () => {
        let subscribeSaved = this.state.prevSubscribe
        firebase.database().ref(`users/${this.props.uid}/subscribe`).set(subscribeSaved).
            then((data) => {
                console.log("update subscribe to Firebase success")
                // dispatch({ type: "FULFILLED" })
            }).
            catch((err) => {
                console.log("update subscribe to Firebase failed")
                // dispatch({ type: "REJECTED" })
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <Switch onValueChange={this.toggleSwitch} value={this.state.subscribe} />
                <Text style={styles.text}>{this.state.subscribe ? 'ON' : 'OFF'}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'flex-end'
    },
    text: {
        fontSize: 15,
        color: 'grey',
    }
})