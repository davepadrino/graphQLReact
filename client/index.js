import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import {
  ApolloProvider
} from 'react-apollo';

import './style/style.css'
import App from './components/App';
import SongList from './components/SongList';
import SongCreate from './components/SongCreate';
import SongDetail from './components/SongDetail';

const client = new ApolloClient({
  dataIdFromObject: o => o.id
});

const Root = () => ( 
    <ApolloProvider client = {client} >
      <Router history = {hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={SongList} />
          <Route path="songs-create" component={SongCreate} />
          <Route path="song/:id" component={SongDetail} />
        </Route>
      </Router>
            
    </ApolloProvider>)

  ReactDOM.render( <Root /> , document.querySelector('#root'));

