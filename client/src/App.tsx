import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { RootState } from './ducks';
import { authActions } from './ducks/auth';

type AppProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const App: React.FC<AppProps> = props => {
  useEffect(() => {
    props.authStart();
  }, []);

  const clickHandler = () => {
    if (!props.auth.user) {
      props.authSignIn('test@test.com', '123456');
    } else {
      props.authSignOut();
    }
  };

  return (
    <div className="App">
      <p>App</p>
      <button onClick={clickHandler}>{!props.auth.user ? 'Sign in' : 'Sign out'}</button>
      <p>{JSON.stringify(props.auth.user)}</p>
    </div>
  );
};

const mapStateToProps = (state: RootState) => state;

const mapDispatchToProps = {
  authStart: authActions.start,
  authSignIn: authActions.signIn,
  authSignOut: authActions.signOut
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
