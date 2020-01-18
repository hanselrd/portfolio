import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { animated, useSpring } from 'react-spring';
import { RootState } from './ducks';
import { localeActions } from './ducks/locale';
import { routerActions } from './ducks/router';
import Footer from './singletons/Footer';
import Header from './singletons/Header';
import Routes from './singletons/Routes';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const locale = useSelector((state: RootState) => state.locale);
  const router = useSelector((state: RootState) => state.router);

  useEffect(() => {
    dispatch(localeActions.start());
    dispatch(routerActions.start());
    /* dispatch(routerActions.push('/')); */
  }, [dispatch]);

  const spring = useSpring({ opacity: 1, number: 2020, from: { opacity: 0, number: 0 } });

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <animated.main className="container flex-1 px-6 mt-20 break-all" style={spring}>
        <p className="text-center text-red-700 sm:hidden">XS</p>
        <p className="hidden text-center text-blue-700 sm:block md:hidden">SM</p>
        <p className="hidden text-center text-green-700 md:block lg:hidden">MD</p>
        <p className="hidden text-center text-yellow-700 lg:block xl:hidden">LG</p>
        <p className="hidden text-center text-purple-500 xl:block">XL</p>
        <p>{JSON.stringify(locale)}</p>
        <p>{JSON.stringify(router)}</p>
        <Routes />
        <animated.span>{spring.number.interpolate(x => Math.floor(x))}</animated.span>
        <p>{JSON.stringify(window.location)}</p>
      </animated.main>
      <Footer />
    </div>
  );
};

export default App;
