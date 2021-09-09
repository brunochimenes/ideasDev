import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import api from '../services/api';

import Icon from 'react-native-vector-icons/FontAwesome';

export default class Annotation extends Component {

  handleLike = () => {
    const { _id } = this.props.annotation;

    api.post(`likes/${_id}`);
  }

  render() {
    const { annotation } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.author}>{annotation.author}</Text>
        <Text style={styles.content}>{annotation.content}</Text>
        <TouchableOpacity onPress={this.handleLike} style={styles.likeButton}>
          <Icon name="thumbs-o-up" size={20} color="#999" />
          <Text style={styles.likeText}>{annotation.likes}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderBottomWidth: 1,
    borderColor: "#eee"
  },
  author: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1C2022"
  },
  content: {
    fontSize: 15,
    lineHeight: 20,
    color: "#1C2022",
    marginVertical: 10
  },
  likeButton: {
    flexDirection: "row",
    alignItems: "center"
  },
  likeText: {
    color: "#999",
    marginLeft: 5
  }
});