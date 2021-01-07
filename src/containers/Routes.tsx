import { RootState } from "@/ducks";
import AboutMe from "@/routes/AboutMe";
import Contact from "@/routes/Contact";
import CV from "@/routes/CV";
import Home from "@/routes/Home";
import Landing from "@/routes/Landing";
import Projects from "@/routes/Projects";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { animateScroll } from "react-scroll";

const Routes: React.FC = () => {
  const selected = useSelector((state: RootState) => state.router);

  useEffect(() => {
    animateScroll.scrollToTop();
  }, [selected.location]);

  const renderCatchAll = () => <p>Catch all</p>;

  return (
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/projects" component={Projects} />
      <Route exact path="/cv" component={CV} />
      <Route exact path="/aboutme" component={AboutMe} />
      <Route exact path="/contact" component={Contact} />
      <Route path="/" render={renderCatchAll} />
    </Switch>
  );
};

export default Routes;
