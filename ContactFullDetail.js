import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, ScrollView, TouchableHighlight, Image } from 'react-native';
import LogoutButton from './components/LogoutButton'
import { Actions } from 'react-native-router-flux'

export default class ContactFullDetail extends React.Component {
    constructor(props) {
        super(props)
    }

    componentWillUnmount() {
        console.log(this.props)
    }

    render() {
        return (
            <ScrollView>
                <Text style={styles.name}>{this.props.data.name}</Text>
                <Image source={{ uri: this.props.data.picture }} style={styles.image}></Image>
                <Text style={styles.name}>Mobile :<Text style={styles.name}>{this.props.data.telephone}</Text></Text>
                <Text style={styles.name}>Email : <Text style={styles.name}>{this.props.data.email}</Text></Text>
                <Text style={styles.name}>Address : <Text style={styles.name}>{this.props.data.address}</Text></Text>
                <LogoutButton />
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        marginTop: 30,
        flexDirection: 'column'
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
    },
    name: {
        fontSize: 19,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'black'
    },
    image: {
        height: 240,
        width: 360,
        resizeMode: 'contain',
        margin: 20,
        alignItems: 'center'
    },
    body: {
        fontSize: 15,
        flex: 0.2
    }
})