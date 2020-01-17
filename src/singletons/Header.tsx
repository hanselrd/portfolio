import React, { useState } from 'react';
import { FaBars, FaGlobeAmericas, FaRegBookmark } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { RemoveScroll } from 'react-remove-scroll';
import { animated, useSpring } from 'react-spring';
import { RootState } from '../ducks';
import { localeActions } from '../ducks/locale';
import { routerActions } from '../ducks/router';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const selected = useSelector((state: RootState) => ({
    locale: state.locale,
    router: state.router
  }));

  const [showSidebar, setShowSidebar] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  const sidebarSpring = useSpring({
    marginLeft: showSidebar ? 0 : -1000
  });

  return (
    <>
      <header className="fixed top-0 left-0 z-10 w-full p-6 m-auto text-gray-300 bg-gray-900 shadow-md ">
        <div className="container flex justify-between m-auto sm:px-2 md:px-4 lg:px-8 xl:px-16">
          <div className="flex my-auto">
            <div className="flex sm:hidden">
              <button
                onClick={() => {
                  setShowSidebar(!showSidebar);
                  setShowLanguageModal(false);
                }}
                className="focus:outline-none"
              >
                <FaBars className="my-auto hover:text-white" />
              </button>
            </div>
            <div className="flex my-auto ml-6 sm:ml-0">
              <FaRegBookmark className="my-auto text-xl text-gray-600" />
              <span className="ml-1 font-bold text-white">Hansel De La Cruz</span>
            </div>
            <div className="hidden m-auto ml-12 sm:block">
              <ul className="flex text-xs font-bold">
                <li
                  onClick={() => {
                    dispatch(routerActions.push('/home'));
                  }}
                  className="cursor-pointer hover:text-white"
                >
                  <span
                    className={`px-1 ${
                      selected.router.location && selected.router.location.pathname === '/home'
                        ? 'border-b-4 border-white text-white'
                        : ''
                    }`}
                  >
                    Home
                  </span>
                </li>
                <li
                  onClick={() => {
                    dispatch(routerActions.push('/projects'));
                  }}
                  className="ml-6 cursor-pointer hover:text-white"
                >
                  <span
                    className={`px-1 ${
                      selected.router.location && selected.router.location.pathname === '/projects'
                        ? 'border-b-4 border-white text-white'
                        : ''
                    }`}
                  >
                    Projects
                  </span>
                </li>
                <li
                  onClick={() => {
                    dispatch(routerActions.push('/resume'));
                  }}
                  className="ml-6 cursor-pointer hover:text-white"
                >
                  <span
                    className={`px-1 ${
                      selected.router.location && selected.router.location.pathname === '/resume'
                        ? 'border-b-4 border-white text-white'
                        : ''
                    }`}
                  >
                    Résumé
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <button
            onClick={() => {
              setShowLanguageModal(!showLanguageModal);
              setShowSidebar(false);
            }}
            className="focus:outline-none"
          >
            <div className="flex my-auto hover:text-white">
              <FaGlobeAmericas className="my-auto" />
              <span className="ml-1 text-xs font-bold uppercase">{selected.locale.language}</span>
            </div>
          </button>
        </div>
      </header>
      {/* sidebar */}
      <div
        onClick={event => {
          if (event.target === event.currentTarget) {
            setShowSidebar(false);
          }
        }}
        className={`${showSidebar ? 'block' : 'hidden'} fixed top-0 left-0 w-full h-full sm:hidden`}
        style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
      >
        <animated.div
          className="w-5/12 h-full pt-24 text-gray-300 bg-gray-900 shadow-md"
          style={sidebarSpring}
        >
          <RemoveScroll enabled={showSidebar}>
            <div>
              <ul className="text-sm font-semibold text-center">
                <li
                  onClick={() => {
                    dispatch(routerActions.push('/home'));
                    setShowSidebar(false);
                  }}
                  className="cursor-pointer hover:text-white"
                >
                  <span
                    className={`px-1 ${
                      selected.router.location && selected.router.location.pathname === '/home'
                        ? 'border-b-4 border-white text-white'
                        : ''
                    }`}
                  >
                    Home
                  </span>
                </li>
                <li
                  onClick={() => {
                    dispatch(routerActions.push('/projects'));
                    setShowSidebar(false);
                  }}
                  className="mt-8 cursor-pointer hover:text-white"
                >
                  <span
                    className={`px-1 ${
                      selected.router.location && selected.router.location.pathname === '/projects'
                        ? 'border-b-4 border-white text-white'
                        : ''
                    }`}
                  >
                    Projects
                  </span>
                </li>
                <li
                  onClick={() => {
                    dispatch(routerActions.push('/resume'));
                    setShowSidebar(false);
                  }}
                  className="mt-8 cursor-pointer hover:text-white"
                >
                  <span
                    className={`px-1 ${
                      selected.router.location && selected.router.location.pathname === '/resume'
                        ? 'border-b-4 border-white text-white'
                        : ''
                    }`}
                  >
                    Résumé
                  </span>
                </li>
              </ul>
            </div>
          </RemoveScroll>
        </animated.div>
      </div>
      {/* language modal */}
      <div
        onClick={() => {
          setShowLanguageModal(false);
        }}
        className={`${
          showLanguageModal ? 'block' : 'hidden'
        } fixed top-0 left-0 w-full h-full z-50`}
        style={{ backgroundColor: 'rgba(0,0,0,0.85)' }}
      >
        <RemoveScroll enabled={showLanguageModal}>
          <div className="w-3/4 h-auto mx-auto mt-32 text-white rounded">
            <h1 className="text-lg font-bold text-center">Choose your preferred language</h1>
            <div className="flex justify-center mt-10">
              <button
                onClick={() => {
                  dispatch(localeActions.change('en'));
                  setShowLanguageModal(false);
                }}
                className="px-6 py-2 border-2 rounded hover:bg-gray-100 hover:text-black focus:outline-none"
              >
                English
              </button>
              <button
                onClick={() => {
                  dispatch(localeActions.change('es'));
                  setShowLanguageModal(false);
                }}
                className="px-6 py-2 ml-6 border-2 rounded hover:bg-gray-100 hover:text-black focus:outline-none sm:ml-10"
              >
                Español
              </button>
            </div>
          </div>
        </RemoveScroll>
      </div>
    </>
  );
};

export default Header;
