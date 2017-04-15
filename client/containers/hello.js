import React, { Component } from 'react';
import {Dispatch} from '../state';

import {SayHelloButton} from '../components/sayHelloButton';

export const Hello = () => {
  const _onClickSign = () => {
    Dispatch('auth:sign', {
      username: 'lpcyn',
      password: 'lpcyn'
    });
  };

  const _onClickTest = () => {
    Dispatch('test');
  };

  return (
    <SayHelloButton onClickTest={_onClickTest} onClickSign={_onClickSign} />
  );
};
