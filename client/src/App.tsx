import Footer from '@app/containers/Footer';
import Header from '@app/containers/Header';
import Routes from '@app/containers/Routes';
import { RootState } from '@app/ducks';
import { authActions } from '@app/ducks/auth';
import { routerActions } from '@app/ducks/router';
import * as React from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import styled from 'styled-components';

const AppDiv = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

type AppProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

class App extends React.Component<AppProps> {
  public componentWillMount() {
    this.props.authStart();
    this.props.routerStart();
  }

  public render() {
    return (
      <AppDiv>
        <Header />
        <Container text={true} style={{ marginTop: '7em', flex: 1 }}>
          <Routes />
        </Container>
        <Footer />
      </AppDiv>
    );
  }
}

const mapStateToProps = (state: RootState) => state;

const mapDispatchToProps = {
  authStart: authActions.start,
  authSignOut: authActions.signOut,
  routerStart: routerActions.start
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
