import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './pages/Main';
import Repositorios from './pages/Repositorios';

export default function Routes(){
    return (
  <BrowserRouter>
	<Switch>
	  <Route exact path="/" component={Main} />
	  <Route exact path="/repositorios/:repositorios" component={Repositorios} />
	</Switch>
  </BrowserRouter>
    );
}
