import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Game from '../pages/Game';
import Settings from '../pages/Settings';
import Feedback from '../pages/Feedback';
import Ranking from '../pages/Ranking';

export default class Content extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/game" component={ Game } />
        <Route path="/settings" component={ Settings } />
        <Route path="/feedback" component={ Feedback } />
        <Route path="/ranking" component={ Ranking } />
      </Switch>
    );
  }
}
