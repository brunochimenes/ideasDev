import React, { Component } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import socket from 'socket.io-client';
import api from '../services/api';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Annotation from '../components/Annotation';

export default class Timeline extends Component {
  //Header da aplicação, função que retorna um objeto
  static navigationOptions = ({ navigation }) => ({
    title: 'Início',
    headerRight: (
      <TouchableOpacity onPress={() => navigation.navigate('New')}>
        <Icon
          style={{ marginRight: 20 }}
          name="add-circle-outline"
          size={24}
          color="4BB0EE"
        />
      </TouchableOpacity>
    )
  });
  //Inicio do estado
  state = {
    annotations: [],
  };
  //Metodo é executado automaticamento quando o conteudo ser montado em tela
  async componentDidMount() {
    this.subscribeToEvents();

    const response = await api.get('annotations');
    this.setState({ annotations: response.data });
  }

  subscribeToEvents = () => {
    const io = socket("http://localhost:3000");

    io.on("annotation", data => {
      this.setState({ annotations: [data, ...this.state.annotations] });
    });

    io.on("like", data => {
      this.setState({
        annotations: this.state.annotations.map(
          annotation => (annotation._id === data._id ? data : annotation)
        )
      });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.annotations}
          keyExtractor={annotation => annotation._id}
          renderItem={({ item }) => <Annotation annotation={item} />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});
