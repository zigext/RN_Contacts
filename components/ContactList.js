import React from 'react';
import { StyleSheet, Text, View, Button, ListView, TouchableHighlight, ScrollView } from 'react-native';
import ContactInfo from './ContactInfo'
import firebase from '../Firebase'


export default class ContactList extends React.Component {

    constructor(props) {
          super(props);
          this.ref = null;
          this.listView = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
          });

          this.state = {
            contacts: this.listView.cloneWithRows({}),
          };

          // Keep a local reference of the TODO items
          this.contacts = {};
        }

        // Load the Todos on mount
        componentDidMount() {
          this.ref = firebase.database().ref('contacts');
          this.ref.on('value', this.handleContactsUpdate);
        }

        // Unsubscribe from the todos on unmount
        componentWillUnmount() {
          if (this.ref) {
            this.ref.off('value', this.handleToDoUpdate);
          }
        }

        // Handle ToDo updates
        handleContactsUpdate = (snapshot) => {
          this.contacts = snapshot.val() || {};
          console.log(this.contacts)
          this.setState({
            contacts: this.listView.cloneWithRows(this.contacts),
          });
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