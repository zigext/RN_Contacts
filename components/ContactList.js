import React from 'react';
import { StyleSheet, Text, View, Button, ListView, TouchableHighlight, ScrollView } from 'react-native';
import ContactInfo from './ContactInfo'
import firebase from '../Firebase'


export default class ContactList extends React.Component {

    constructor(props) {
        super(props)
        this.ref = null
        this.listView = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
        })

        this.state = {
            contacts: this.listView.cloneWithRows({}),
        }

        // Keep a local reference of the TODO items
        this.contacts = {}
    }

    getContactsFromFirebase = (uid) => {
        console.log("YYY ", uid)
        this.ref = firebase.database().ref(`contacts/${uid}`)
        this.ref.on('value', this.handleContactsUpdate)
    }

    // Load the contacts on mount
    componentDidMount() {
        console.log("XXXX ", this.props.uid)
        this.getContactsFromFirebase(this.props.uid)
    }

    // Unsubscribe from the todos on unmount
    componentWillUnmount() {
        if (this.ref) {
            this.ref.off('value', this.handleToDoUpdate)
        }
    }

    // Handle contacts updates
    handleContactsUpdate = (snapshot) => {
        this.contacts = snapshot.val() || {};
        console.log("ZZZZ ", this.contacts)
        this.setState({
            contacts: this.listView.cloneWithRows(this.contacts),
        })
    }

    // Render a contact row
    renderContacts(rowData) {
        return (
            <ContactInfo {...rowData}></ContactInfo>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <ListView
                    dataSource={this.state.contacts}
                    renderRow={(...args) => this.renderContacts(...args)}
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