import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { animateScroll } from 'react-scroll';
import { RootState } from '../ducks';
/* import Landing from '../routes/Landing'; */

const Routes: React.FC = () => {
  const selected = useSelector((state: RootState) => state.router);

  useEffect(() => {
    animateScroll.scrollToTop();
  }, [selected.location]);

  const renderCatchAll = () => <p>Catch all</p>;

  return (
    <Switch>
      {/* <Route exact={true} path="/" component={Landing} /> */}
      <Route path="/" render={renderCatchAll} />
    </Switch>
  );
};

export default Routes;
