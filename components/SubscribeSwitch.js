import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, TouchableHighlight, Switch } from 'react-native'
import firebase from '../Firebase'


export default class SubscribeSwitch extends Component {
    constructor(props) {
        super(props)
        this.state = {
            switchValue: false
        }
    }

    toggleSwitch = (value) => {
        console.log("switch")
        this.setState({ switchValue: !this.state.switchValue })
        firebase.messaging().subscribeToTopic('contacts')
    }

    sunscribe = () => {
        firebase.messaging().subscribeToTopic('contacts')
    }

    render() {
        return (
            <View style={styles.container}>
                <Switch onValueChange={this.toggleSwitch} value={this.state.switchValue} onValueChange={this.toggleSwitch} />
                <Text style={styles.text}>{this.state.switchValue ? 'ON' : 'OFF'}</Text>
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