import React from 'react';
import { Route } from 'react-router-dom';
import { List, Create, Update, Show } from '../components/rtable/';

export default [
  <Route path="/r_tables/create" component={Create} exact key="create" />,
  <Route path="/r_tables/edit/:id" component={Update} exact key="update" />,
  <Route path="/r_tables/show/:id" component={Show} exact key="show" />,
  <Route path="/r_tables/" component={List} exact strict key="list" />,
  <Route path="/r_tables/:page" component={List} exact strict key="page" />
];
