import React from 'react';

const Login = () => {

  const login = async function () {
    window.location.href = 'http://localhost:3000/auth/login/google';
  };

  return (
    <div className="login">
      <h1 className="loginTitle">Login</h1>
      <div className="wrapper">
        <div className="left">
          <div className="loginButton google" onClick={ login }>
            Google
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
