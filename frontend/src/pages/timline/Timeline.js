import React, { Component } from 'react';
import api from '../../services/api';
import socket from 'socket.io-client';

import Annotation from '../../components/Annotation';

import "./Timeline.css";

export default class Timeline extends Component {
  //Armazena um valor inicial no estado
  state = {
    annotations: [],
    newAnnotation: '',
  };

  //Executa automaticamente quando a pagina é exibida em tela
  async componentDidMount() {
    this.subscribeToEvents();
    //Array com todos as anotações do banco
    const response = await api.get('annotations');
    //Altera o valor inicial do estado
    this.setState({ annotations: response.data });
  }

  //Atualiza em tempo real
  subscribeToEvents = () => {
    //Passa o endereço da api
    const io = socket('http://localhost:3000');
    //Recebe os dados das anotações
    io.on('annotation', data => {
      //Criar uma nova variavel com um novo valor
      this.setState({ annotations: [data, ...this.state.annotations] });
    });
    //Receber os dados do likes
    io.on('like', data => {
      //Procurar as anotações percorrendo as e atualizar seu valor
      this.setState({
        annotations: this.state.annotations.map(annotation =>
          annotation._id === data._id ? data : annotation
        )
      });
    });
  };

  handleNewAnnotation = async (e) => {
    //Caso for diferente da tecla enter(13)
    if (e.keyCode !== 13) return;

    const content = this.state.newAnnotation;
    const author = localStorage.getItem('@IdeasDev:username');
    //Envia os dados para a rota annotations
    await api.post('annotations', { content, author });
    //Zera o valor da textarea
    this.setState({ newAnnotation: '' });
  }

  handleInputChange = (e) => {
    //Altera o valor inicial do estado
    this.setState({ newAnnotation: e.target.value });
  };

  render() {
    return (
      <div className="timeline-wrapper">
        <h1>Ideias Dev</h1>
        <form>
          <textarea value={this.state.newAnnotation} onChange={this.handleInputChange} onKeyDown={this.handleNewAnnotation} placeholder="Compartilhe sua ideia dev!"></textarea>
        </form>
        <ul className="annotation-list">
          {this.state.annotations.map(annotation => (
            //Passo a variavel para o componente acessar atraves das propriedades
            <Annotation key={annotation._id} annotation={annotation} />
          ))}
        </ul>
      </div>
    );
  }
}