import Debug from "@/components/Debug";
import List from "@/components/List";
import Footer from "@/containers/Footer";
import Header from "@/containers/Header";
import Routes from "@/containers/Routes";
import { Color } from "@/data/color";
import { RootState } from "@/ducks";
import { localeActions } from "@/ducks/locale";
import { routerActions } from "@/ducks/router";
import { themeActions } from "@/ducks/theme";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { animated, useSpring } from "react-spring";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const locale = useSelector((state: RootState) => state.locale);
  const router = useSelector((state: RootState) => state.router);
  const theme = useSelector((state: RootState) => state.theme);

  useEffect(() => {
    dispatch(localeActions.start());
    dispatch(routerActions.start());
    dispatch(themeActions.start());
  }, [dispatch]);

  const spring = useSpring({
    opacity: 1,
    number: 2020,
    from: { opacity: 0, number: 0 },
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <animated.main className="container flex-1 px-6 mt-20 break-all" style={spring}>
        <Debug color={Color.Red500}>
          <p className="text-center text-red-700 sm:hidden">XS</p>
          <p className="hidden text-center text-blue-700 sm:block md:hidden">SM</p>
          <p className="hidden text-center text-green-700 md:block lg:hidden">MD</p>
          <p className="hidden text-center text-yellow-700 lg:block xl:hidden">LG</p>
          <p className="hidden text-center text-purple-500 xl:block">XL</p>
        </Debug>
        <Debug color={Color.Blue500}>
          <p>{JSON.stringify(locale)}</p>
          <p>{JSON.stringify(router)}</p>
          <p>{JSON.stringify(theme)}</p>
        </Debug>
        <Debug color={Color.Green500}>
          <Routes />
        </Debug>
        <Debug color={Color.Yellow500}>
          <animated.span>{spring.number.interpolate((x) => Math.floor(x as number))}</animated.span>
        </Debug>
        <Debug color={Color.Pink500}>
          <p>{JSON.stringify(window.location)}</p>
        </Debug>
        <Debug color={Color.Purple500}>
          <Debug color={Color.Red700}>
            <List horizontal spacing={2}>
              <div className="w-24 text-center border-2 border-white rounded">1</div>
              <div className="w-24 text-center border-2 border-white rounded">2</div>
              <div className="w-24 text-center border-2 border-white rounded">3</div>
              <div className="w-24 text-center border-2 border-white rounded">4</div>
            </List>
          </Debug>
          <Debug color={Color.Blue700}>
            <List horizontal reverse spacing={2}>
              <div className="w-24 text-center border-2 border-white rounded">1</div>
              <div className="w-24 text-center border-2 border-white rounded">2</div>
              <div className="w-24 text-center border-2 border-white rounded">3</div>
              <div className="w-24 text-center border-2 border-white rounded">4</div>
            </List>
          </Debug>
        </Debug>
      </animated.main>
      <Footer />
    </div>
  );
};

export default App;
