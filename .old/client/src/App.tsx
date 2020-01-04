import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Routes from './containers/Routes';
import { RootState } from './ducks';
import { authActions } from './ducks/auth';
import { localeActions } from './ducks/locale';
import { routerActions } from './ducks/router';

type AppProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const App: React.FC<AppProps> = props => {
  useEffect(() => {
    props.authStart();
    props.localeStart();
    props.routerStart();
    props.routerPush('/');
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
      <p>{JSON.stringify(props.router.location)}</p>
      <button onClick={clickHandler}>{!props.auth.user ? 'Sign in' : 'Sign out'}</button>
      <p>{JSON.stringify(props.auth.user)}</p>
      <Routes />
    </div>
  );
};

const mapStateToProps = (state: RootState) => state;

const mapDispatchToProps = {
  authStart: authActions.start,
  authSignIn: authActions.signIn,
  authSignOut: authActions.signOut,
  localeStart: localeActions.start,
  localeChange: localeActions.change,
  localeShowModal: localeActions.showModal,
  localeHideModal: localeActions.hideModal,
  routerStart: routerActions.start,
  routerPush: routerActions.push,
  routerReplace: routerActions.replace,
  routerGo: routerActions.go,
  routerGoBack: routerActions.goBack,
  routerGoForward: routerActions.goForward
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
