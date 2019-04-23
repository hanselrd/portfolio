import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import * as Scroll from 'react-scroll';
import { RootState } from '../ducks';
import Landing from '../routes/Landing';

type RoutesProps = ReturnType<typeof mapStateToProps>;

const Routes: React.FC<RoutesProps> = props => {
  useEffect(() => {
    Scroll.animateScroll.scrollToTop();
  }, [props.router.location]);

  const renderCatchAll = () => <p>Catch all</p>;

  return (
    <Switch>
      <Route exact={true} path="/" component={Landing} />
      <Route path="/" render={renderCatchAll} />
    </Switch>
  );
};

const mapStateToProps = (state: RootState) => state;

export default connect(
  mapStateToProps,
  {}
)(Routes);
