import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/login/Login';
import Timeline from './pages/timline/Timeline';

class App extends Component {
  render() {
    return (
      /**
       * BrowserRouter - Caminho (url)
       * Switch - Uma rota por endereço
       * Route - Rendeiza a rota
       * */
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/timeline" component={Timeline} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;