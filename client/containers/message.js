import React, { Component } from 'react';

import {MessageNode} from '../components/message';
import {GetState} from '../state';

export const Message = () => {
  const state = GetState();
  let message = state.message;
  let token = state.ui.headers.authorization;

  return <MessageNode message={message} token={token} />;
};
