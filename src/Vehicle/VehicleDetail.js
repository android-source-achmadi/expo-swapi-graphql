import React, { Component, PropTypes } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {
  ActivityIndicator,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';

import LoadingComponent from '../DataHandler/LoadingComponent';
import ErrorComponent from '../DataHandler/ErrorComponent';

@graphql(gql`
    query($id: ID!) {
      vehicle(id: $id) {
        name
        model
        vehicleClass
        manufacturers
        costInCredits
        length
        crew
        passengers
        maxAtmospheringSpeed
        cargoCapacity
        consumables
      }
    }
`, {
  options: (props) => ({
    variables: {
      id: props.navigation.state.params.id,
    },
  }),
})
class VehicleDetail extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.name,
  });

  render() {
    if (this.props.data.error) {
      return (
        <ErrorComponent error={this.props.data.error} />
      );
    }

    if (this.props.data.loading) {
      return (
        <LoadingComponent />
      );
    }

    const { vehicle } = this.props.data;

    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>{vehicle.name}</Text>
        </View>
      </View>
    );
  }
}

export default VehicleDetail;

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 19,
  },
  openingCrawlContainer: {
    alignItems: 'center',
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
    paddingVertical: 10,
  },
  openingCrawlText: {
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  messageInput: {
    backgroundColor: '#fff',
    width: Dimensions.get('window').width,
    borderWidth: 1,
    borderColor: '#eee',
    padding: 30,
  },
});
