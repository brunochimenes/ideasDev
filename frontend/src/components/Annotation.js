import React, { Component } from "react";
import api from "../services/api";

import like from '../icons/like.png';
import './Annotation.css';

export default class Annotation extends Component {
  handleLike = async () => {
    const { _id } = this.props.annotation;

    await api.post(`likes/${_id}`);
  }

  render() {
    //Desestrutura as propriedades
    const { annotation } = this.props;

    return (
      <li className="annotation">
        <strong>{annotation.author}</strong>
        <p>{annotation.content}</p>
        <button type="button" onClick={this.handleLike}>
          <img src={like} alt="like" />
          {annotation.likes}
        </button>
      </li>
    )
  }
}