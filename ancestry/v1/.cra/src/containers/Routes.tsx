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

  return (
    <Switch>
      <Route exact path="/">
        <Landing />
      </Route>
      <Route exact path="/home">
        <Home />
      </Route>
      <Route exact path="/projects">
        <Projects />
      </Route>
      <Route exact path="/cv">
        <CV />
      </Route>
      <Route exact path="/aboutme">
        <AboutMe />
      </Route>
      <Route exact path="/contact">
        <Contact />
      </Route>
      <Route path="/">
        <p>Catch all</p>
      </Route>
    </Switch>
  );
};

export default Routes;
