import React, { Component } from 'react';
import {Hello} from '../containers/hello';
import {Message} from '../containers/message';

export const Body = () => (
  <div>
    <Hello />
    <Message />
  </div>
);
