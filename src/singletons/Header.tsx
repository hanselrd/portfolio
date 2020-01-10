import React, { useState } from 'react';
import { FaBars, FaGlobeAmericas, FaRegBookmark } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { RemoveScroll } from 'react-remove-scroll';
import { animated, useSpring } from 'react-spring';
import { RootState } from '../ducks';
import { localeActions } from '../ducks/locale';

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
      <header className="bg-gray-900 fixed top-0 left-0 text-gray-300 w-full p-6 m-auto z-10 shadow-md">
        <div className="container flex m-auto justify-between sm:px-2 md:px-4 lg:px-8 xl:px-16">
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
            <div className="flex ml-6 my-auto sm:ml-0">
              <FaRegBookmark className="my-auto text-xl text-gray-600" />
              <span className="ml-1 font-bold text-white">Hansel De La Cruz</span>
            </div>
            <div className="hidden ml-12 m-auto sm:block">
              <ul className="text-xs font-bold flex">
                <li className="hover:text-white text-white">
                  <span className="border-b-4 border-white px-1">Home</span>
                </li>
                <li className="ml-6 hover:text-white">
                  <span className="px-1">Projects</span>
                </li>
                <li className="ml-6 hover:text-white">
                  <span className="px-1">Résumé</span>
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
          className="bg-gray-900 pt-24 w-5/12 h-full text-gray-300 shadow-md"
          style={sidebarSpring}
        >
          <RemoveScroll enabled={showSidebar}>
            <div>
              <ul className="text-sm font-semibold text-center">
                <li className="hover:text-white text-white">
                  <span className="border-b-4 border-white px-1">Home</span>
                </li>
                <li className="mt-8 hover:text-white">
                  <span className="px-1">Projects</span>
                </li>
                <li className="mt-8 hover:text-white">
                  <span className="px-1">Résumé</span>
                </li>
              </ul>
            </div>
          </RemoveScroll>
        </animated.div>
      </div>
      {/* language modal */}
      <div
        onClick={event => {
          if (event.target === event.currentTarget) {
            setShowLanguageModal(false);
          }
        }}
        className={`${
          showLanguageModal ? 'block' : 'hidden'
        } fixed top-0 left-0 w-full h-full z-50`}
        style={{ backgroundColor: 'rgba(0,0,0,0.85)' }}
      >
        <RemoveScroll enabled={showLanguageModal}>
          <div className="mt-32 w-3/4 h-auto mx-auto text-white rounded">
            <h1 className="font-bold text-lg text-center">Choose your preferred language</h1>
            <div className="mt-10 flex justify-center">
              <button
                onClick={() => {
                  dispatch(localeActions.change('en'));
                  setShowLanguageModal(false);
                }}
                className="border-2 rounded px-6 py-2 hover:bg-gray-100 hover:text-black focus:outline-none"
              >
                English
              </button>
              <button
                onClick={() => {
                  dispatch(localeActions.change('es'));
                  setShowLanguageModal(false);
                }}
                className="ml-6 border-2 rounded px-6 py-2 hover:bg-gray-100 hover:text-black focus:outline-none sm:ml-10"
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
