import React, { Component } from 'react';
import RouterLink from '../../containers/header/routerLink';

const Routers = ['login', 'main', 'default'];

const Router = () => {
  const RouterLinks = Routers.map((router, index) => (
    <RouterLink key={index} view={router}>
      <span className='text-capitalize'>{router}</span>
    </RouterLink>
  ));

  return (
    <ul className='nav navbar-nav'>
      {RouterLinks}
    </ul>
  );
};

export default Router;
