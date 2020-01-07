import React, { useEffect } from 'react';
import { FaBars, FaFacebook, FaGithub, FaLinkedin, FaRegBookmark } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { animated, useSpring } from 'react-spring';
import { RootState } from './ducks';
import { localeActions } from './ducks/locale';
import { routerActions } from './ducks/router';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const locale = useSelector((state: RootState) => state.locale);
  const router = useSelector((state: RootState) => state.router);

  useEffect(() => {
    dispatch(localeActions.start());
    dispatch(routerActions.start());
    dispatch(routerActions.push('/'));
  }, [dispatch]);

  const spring = useSpring({ opacity: 1, number: 2020, from: { opacity: 0, number: 0 } });

  return (
    <div className="font-sans flex flex-col min-h-screen bg-gray-100">
      <header className="px-4 py-4 flex justify-between bg-gray-900 fixed w-full top-0 z-10 text-white shadow-md">
        <div className="font-extrabold flex align-middle">
          <FaRegBookmark className="text-xl text-blue-600" />{' '}
          <span className="ml-1">Hansel De La Cruz</span>
        </div>
        <div className="font-bold text-lg sm:text-sm">
          <ul className="flex sm:hidden">
            <li>
              <button className="rounded p-1 hover:bg-gray-700">
                <FaBars />
              </button>
            </li>
          </ul>
          <ul className="hidden sm:flex">
            <li>Résumé</li>
            <li className="ml-2">Projects</li>
          </ul>
        </div>
      </header>
      <animated.main className="container flex-1 mt-20 px-6 break-all" style={spring}>
        <p className="sm:hidden text-red-700 text-center">XS</p>
        <p className="hidden sm:block md:hidden text-blue-700 text-center">SM</p>
        <p className="hidden md:block lg:hidden text-green-700 text-center">MD</p>
        <p className="hidden lg:block xl:hidden text-yellow-700 text-center">LG</p>
        <p className="hidden xl:block text-purple-500 text-center">XL</p>
        <p>{JSON.stringify(locale)}</p>
        <p>{JSON.stringify(router)}</p>
        <animated.span>{spring.number.interpolate(val => Math.floor(val))}</animated.span>
        {/* <button>Click me</button> */}
      </animated.main>
      <footer className="bg-gray-900 mt-4 px-4 py-16 text-white">
        <div className="flex justify-between">
          <div className="text-sm font-semibold">
            <ul className="flex">
              <li>About Me</li>
              <li className="ml-2">Contact</li>
            </ul>
          </div>
          <div className="text-lg">
            <ul className="flex">
              <li>
                <FaFacebook />
              </li>
              <li className="ml-3">
                <FaLinkedin />
              </li>
              <li className="ml-3">
                <FaGithub />
              </li>
            </ul>
          </div>
        </div>
        <hr className="border-0 border-gray-800 my-8" />
        <div className="w-full text-xs text-gray-300 text-center">
          <span>&copy; Copyright {new Date().getFullYear()}</span>{' '}
          <span className="font-bold">Hansel De La Cruz</span>
        </div>
      </footer>
      <div
        className="hidden fixed z-50 top-0 left-0 w-full h-full overflow-auto bg-black"
        style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      >
        <div className="mt-16 mx-auto p-4 bg-gray-100 rounded w-5/6 text-white">
          <div>
            <h1 className="text-lg font-bold">Header</h1>
          </div>
          <div>Content</div>
          <div>Footer</div>
        </div>
      </div>
    </div>
  );
};

export default App;
