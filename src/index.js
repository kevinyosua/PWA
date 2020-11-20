import React from 'react';
import ReactDOM from 'react-dom';
import M from 'materialize-css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Nav from './components/Nav';
import Team from './components/Team';
import Saved from './components/Saved';
import db from './db';

const root = document.getElementById("root");


console.log('process.env.BASE_URL')
window.DB = db;

ReactDOM.render(
<BrowserRouter>
    <Nav />
    <div className='container'>
    <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/team/:id/:saved?' component={Team} />
        <Route exact path='/save' component={Saved} />
    </Switch>
    </div>
</BrowserRouter>
, root);
