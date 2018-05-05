import { RootState } from '@app/ducks';
import Landing from '@app/routes/Landing';
import Login from '@app/routes/Login';
import * as React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import * as Scroll from 'react-scroll';

type RoutesProps = ReturnType<typeof mapStateToProps>;

class Routes extends React.Component<RoutesProps> {
  public componentWillReceiveProps(nextProps: RoutesProps) {
    if (nextProps.location !== this.props.location) {
      Scroll.animateScroll.scrollToTop();
    }
  }

  public render() {
    return (
      <Switch>
        <Route exact={true} path="/" component={Landing} />
        <Route exact={true} path="/login" component={Login} />
        {/* <Route exact={true} path="/home" render={() => <p>Home</p>} />
        <Route exact={true} path="/profile/:id" render={() => <p>Profile</p>} /> */}
        <Route path="/" render={() => <p>Catch all</p>} />
      </Switch>
    );
  }
}

const mapStateToProps = (state: RootState) => state.router;

export default connect(mapStateToProps, {})(Routes);
