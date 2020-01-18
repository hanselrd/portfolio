import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { animateScroll } from 'react-scroll';
import { RootState } from '../ducks';
import CV from '../routes/CV';
import Home from '../routes/Home';
import Landing from '../routes/Landing';
import Projects from '../routes/Projects';

const Routes: React.FC = () => {
  const selected = useSelector((state: RootState) => state.router);

  useEffect(() => {
    animateScroll.scrollToTop();
  }, [selected.location]);

  const renderCatchAll = () => <p>Catch all</p>;

  return (
    <Switch>
      <Route exact={true} path="/" component={Landing} />
      <Route exact={true} path="/home" component={Home} />
      <Route exact={true} path="/projects" component={Projects} />
      <Route exact={true} path="/cv" component={CV} />
      <Route path="/" render={renderCatchAll} />
    </Switch>
  );
};

export default Routes;
