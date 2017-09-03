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
                <View style={{marginVertical: 20}}>
                    <Text style={styles.name}>{this.props.data.name}</Text>
                    <Image source={{ uri: this.props.data.picture }} style={styles.image}></Image>
                    <Text style={styles.name}>Mobile :<Text style={styles.name}>{this.props.data.telephone}</Text></Text>
                    <Text style={styles.name}>Email : <Text style={styles.body}>{this.props.data.email}</Text></Text>
                    <Text style={styles.name}>Address : <Text style={styles.body}>{this.props.data.address}</Text></Text>
                </View>
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
        resizeMode: 'cover',
        margin: 20,
        alignItems: 'center',
        height: 100,
        borderRadius: 50,
        width: 100,
    },
    body: {
        fontSize: 17,
        fontWeight: 'normal'
    }
})