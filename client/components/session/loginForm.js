import React from 'react';
import PropTypes from 'prop-types';

const LoginForm = ({onClickSubmit}) => {
  let username;
  let password;
  return (
    <div className='container' style={{width: '80%'}}>
      <div className='text-center'>
        <h1 className='page-header'>Welcome to eDictation System</h1>
      </div>
      <div
        className='text-center center-block'
        style={{
          width: '60%',
          marginTop: '4vh'
        }}>
        <form className='form-horizontal'
          onSubmit={(event) => {
            event.preventDefault();
            onClickSubmit(username.value, password.value);
          }}>

          <div className='form-group'>
            <label htmlFor='inputUsername' className='col-sm-3 control-label'>Username</label>
            <div className='col-sm-9'>
              <input id='inputUsername' type='text' className='form-control' placeholder='Username' ref={node => { username = node; }} />
            </div>
          </div>

          <div className='form-group'>
            <label htmlFor='inputPassword' className='col-sm-3 control-label'>Password</label>
            <div className='col-sm-9'>
              <input id='inputPassword' type='password' className='form-control' placeholder='Password' ref={node => { password = node; }} />
            </div>
          </div>

          <div className='col-sm-offset-3 col-sm-9 text-left'>

            <button className='btn btn-default' type='submit'>
              <span className='glyphicon glyphicon-log-in' />{' '}Submit
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

LoginForm.propTypes = {
  onClickSubmit: PropTypes.func.isRequired
};

export default LoginForm;
