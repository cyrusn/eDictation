import React from 'react';
import PropTypes from 'prop-types';

const CodeBlockToken = ({token}) => {
  if (!token) return null;

  return (
    <div>
      <h1>Token</h1>
      <pre><code>{token}</code></pre>
    </div>
  );
};

const Message = ({token}) => {
  return <div className='container'>
    <CodeBlockToken token={token} />
  </div>;
};

CodeBlockToken.propTypes = {
  token: PropTypes.string.isRequired
};

Message.propTypes = {
  token: PropTypes.string.isRequired
};

export default Message;
