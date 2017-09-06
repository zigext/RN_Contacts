import React from 'react';
import { StyleSheet, Text, View, Button, ListView, TouchableHighlight, ScrollView, FlatList } from 'react-native';
import ContactInfo from './ContactInfo'
import firebase from '../Firebase'


export default class ContactList extends React.Component {

    constructor(props) {
        super(props)
        this.ref = null
        // this.listView = new ListView.DataSource({
        //     rowHasChanged: (r1, r2) => r1 !== r2,
        // })

        this.state = {
            // contacts: this.listView.cloneWithRows({}),
            contactsArray: []

        }

        // Keep a local reference of the TODO items
        this.contacts = {}
        this.contactsArray = []
        
    }

    getContactsFromFirebase = (uid) => {
        this.ref = firebase.database().ref(`contacts/${uid}`)
        this.ref.on('value', this.handleContactsUpdate)
    }

    // Load the contacts on mount
    componentDidMount() {
        this.getContactsFromFirebase(this.props.uid)
    }

    // Unsubscribe from the todos on unmount
    componentWillUnmount() {
        if (this.ref) {
            this.ref.off('value', this.handleContactsUpdate)
        }
    }

    // Handle contacts updates
    handleContactsUpdate = (snapshot) => {
        this.contacts = snapshot.val() || {};
        this.contactsArray = Object.keys(this.contacts).map((k) => this.contacts[k])
        console.log("XXX ", this.contactsArray)
        // this.setState({
        //     contacts: this.listView.cloneWithRows(this.contacts),
        // })
         this.setState({
            contactsArray: this.contactsArray
        })
    }

    // Render a contact row
    renderContacts(rowData) {
        console.log("ROW ", rowData)
        return (
            <ContactInfo {...rowData.item}></ContactInfo>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                {/*<ListView
                    dataSource={this.state.contacts}
                    renderRow={(...args) => this.renderContacts(...args)}
                />*/}
                <FlatList
                    data={this.state.contactsArray}
                    renderItem={this.renderContacts}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center'
    }
});