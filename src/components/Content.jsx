import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Game from '../pages/Game';

export default class Content extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/game" component={ Game } />
      </Switch>
    );
  }
}
