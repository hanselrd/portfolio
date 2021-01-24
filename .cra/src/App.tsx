import Debug from "@/components/Debug";
import Flex from "@/components/Flex";
import Grid from "@/components/Grid";
import Link from "@/components/Link";
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
import { FaMoon } from "react-icons/fa";
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

  const spring = useSpring({ from: { opacity: 0, number: 0 }, to: { opacity: 1, number: 2021 } });

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <animated.main className="container flex-1 px-6 mt-20 break-all" style={spring as any}>
        <p>Test</p>
        <List horizontal spacing={8}>
          <Link to="/" embedded>
            Landing
          </Link>
          <Link to="/home">Home</Link>
          <Link to="/projects">Projects</Link>
          <Link to="https://github.com" external>
            <List horizontal spacing={1}>
              <FaMoon />
              <span>Moon</span>
            </List>
          </Link>
        </List>
        <Debug color={Color.Black}>
          <Flex wrap space={3}>
            <Debug color={Color.Red500}>
              <div className="w-24 text-center">1</div>
            </Debug>
            <Debug color={Color.Blue500}>
              <div className="w-24 text-center">2</div>
            </Debug>
            <Debug color={Color.Green500}>
              <div className="w-24 text-center">3</div>
            </Debug>
            <Flex.Item type="one">
              <Debug color={Color.Yellow500}>
                <div className="w-24 text-center">4</div>
              </Debug>
            </Flex.Item>
            <Debug color={Color.Purple500}>
              <div className="w-24 text-center">5</div>
            </Debug>
            <Debug color={Color.Pink500}>
              <div className="w-24 text-center">6</div>
            </Debug>
          </Flex>
        </Debug>
        <Debug color={Color.Black}>
          <Grid columns={3} gap={3}>
            <Debug color={Color.Red500}>
              <div className="w-24 text-center">1</div>
            </Debug>
            <Debug color={Color.Blue500}>
              <div className="w-24 text-center">2</div>
            </Debug>
            <Debug color={Color.Green500}>
              <div className="w-24 text-center">3</div>
            </Debug>
            <Grid.Item columns={2}>
              <Debug color={Color.Yellow500}>
                <div className="w-24 text-center">4</div>
              </Debug>
            </Grid.Item>
            <Debug color={Color.Purple500}>
              <div className="w-24 text-center">5</div>
            </Debug>
            <Debug color={Color.Pink500}>
              <div className="w-24 text-center">6</div>
            </Debug>
          </Grid>
        </Debug>
        <div className="hidden">
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
            <animated.span>{spring.number.to((x) => Math.floor(x))}</animated.span>
          </Debug>
          <Debug color={Color.Pink500}>
            <p>{JSON.stringify(window.location)}</p>
          </Debug>
          <Debug color={Color.Purple500}>
            <Debug color={Color.Red700}>
              <List horizontal spacing={2} wrap>
                <div className="w-24 text-center border-2 border-white rounded">1</div>
                <div className="w-24 text-center border-2 border-white rounded">2</div>
                <div className="w-24 text-center border-2 border-white rounded">3</div>
                <div className="w-24 text-center border-2 border-white rounded">4</div>
                <div className="w-24 text-center border-2 border-white rounded">5</div>
                <div className="w-24 text-center border-2 border-white rounded">6</div>
                <div className="w-24 text-center border-2 border-white rounded">7</div>
              </List>
            </Debug>
            <Debug color={Color.Blue700}>
              <List horizontal reverse spacing={4}>
                <div className="w-24 text-center border-2 border-white rounded">1</div>
                <div className="w-24 text-center border-2 border-white rounded">2</div>
                <div className="w-24 text-center border-2 border-white rounded">3</div>
                <div className="w-24 text-center border-2 border-white rounded">4</div>
                <div className="w-24 text-center border-2 border-white rounded">5</div>
                <div className="w-24 text-center border-2 border-white rounded">6</div>
                <div className="w-24 text-center border-2 border-white rounded">7</div>
              </List>
            </Debug>
          </Debug>
        </div>
      </animated.main>
      <Footer />
    </div>
  );
};

export default App;
