import React from 'react';
import { Redirect } from 'react-router-dom';
import Index from '../page/index/Index';

export default [
  {
    path: '/',
    exact: true,
    render: () => {
      return <Redirect to="/index" />
    }
  },
  {
    path: '/index',
    component: Index
  }
]
