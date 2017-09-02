import React from 'react';
import { StyleSheet, Text, View, Button, ListView, Image, TouchableHighlight } from 'react-native'
import { Actions } from 'react-native-router-flux'

export default class ContactInfo extends React.Component {
    constructor(props) {
        super(props)
    }



    render() {
        pressRow = () => {
            console.log("click")
            console.log(this.props)
            Actions.contactFullDetail({ ...{ data: this.props } })
        }
        return (
            <View>
            <TouchableHighlight onPress={pressRow}>
                <View style={styles.container}>
                    <Image source={{ uri: this.props.picture }} style={styles.image}></Image>
                    <View style={styles.detailContainer}>
                        <Text style={styles.telephone}>{this.props.telephone}</Text>
                        <Text style={styles.name}>{this.props.name}</Text>
                    </View>
                </View>
            </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerTemp: {
        flex: 1,
        backgroundColor: '#000000',
        justifyContent: 'center',
        marginTop: 30,
        flexDirection: 'row'
    },
    image: {
        height: 100,
        borderRadius: 50,
        width: 100,
        margin: 10
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black'
    },
    telephone: {
        fontSize: 18,
        color: 'grey'
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'grey'
    },
    detailContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-end',
        paddingHorizontal: 5,
        paddingVertical: 5
    }
});
