import React, { Component } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, TextInput, AsyncStorage, StyleSheet } from 'react-native';
import api from '../services/api';

import Icon from 'react-native-vector-icons/MaterialIcons';

export default class New extends Component {
  //Remove o header
  static navigationOptions = {
    header: null
  };

  state = {
    newAnnotation: '',
  };
  //Volta para pagina anterior
  goBack = () => {
    this.props.navigation.pop();
  };

  handleStart = async () => {
    const content = this.state.newAnnotation;
    const author = await AsyncStorage.getItem('@IdeasDev:unsername');

    await api.post('annotations', { author, content });
    this.goBack();
  }

  handleInputChange = (newAnnotation) => {
    this.setState({ newAnnotation });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={this.goBack}>
            <Icon name="close" size={24} color="#4BB0EE" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.handleStart}>
            <Text style={styles.buttonText}>Enviar</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.input}
          multiline
          placeholder=""
          placeholderTextColor="#999"
          value={this.state.newAnnotation}
          onChange={this.handleInputChange}
          returnKeyType="send"
          onSubmitEditing={this.handleStart}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  },
  header: {
    paddingTop: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  button: {
    height: 32,
    paddingHorizontal: 20,
    borderRadius: 16,
    backgroundColor: "#4BB0EE",
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold"
  },
  input: {
    margin: 20,
    fontSize: 16,
    color: "#333"
  }
});