import React, { Component } from 'react';

import './Login.css';

export default class Login extends Component {
  //Valor inicial do input, armazenado no estado
  state = {
    username: '',
  };

  handleSubmit = (e) => {
    //Evita o comportamento padrão do form
    e.preventDefault();

    const { username } = this.state;
    if (!username.length) return;
    //Acessa o localStorage do navegador e armazena
    localStorage.setItem('@IdeasDev:username', username);
    /**
     * Props - Acessa as propriedades do elemento html
     * History - Leva para outra pagina
     * */
    this.props.history.push('/timeline');
  }

  handleInputChange = (e) => {
    //Altera o State armazenando um novo valor
    this.setState({ username: e.target.value });
  }

  render() {
    return (
      <div className='login-wrapper'>
        <h1>Ideias Dev</h1>
        <form onSubmit={this.handleSubmit}>
          <input value={this.state.username} onChange={this.handleInputChange} placeholder="Nome de usuário" />
          <button type="submit">Entrar</button>
        </form>
      </div>
    )
  }
}