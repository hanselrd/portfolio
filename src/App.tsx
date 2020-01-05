import React, { useEffect } from 'react';
import { FaBars, FaFacebook, FaGithub, FaLinkedin } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './ducks';
import { localeActions } from './ducks/locale';

const App: React.FC = () => {
  const dispatch = useDispatch();
  /* const locale = useSelector((state: RootState) => state.locale); */

  useEffect(() => {
    dispatch(localeActions.start());
  }, [dispatch]);

  return (
    <div className="flex flex-col h-screen text-white bg-gray-900 border-4 border-red-500 sm:border-blue-500 md:border-green-500 lg:border-yellow-500 xl:border-purple-500">
      <header className="px-4 py-6 flex justify-between">
        <div className="font-extrabold">Hansel De La Cruz</div>
        <div className="font-bold text-lg sm:text-sm">
          <ul className="flex sm:hidden">
            <li>
              <FaBars />
            </li>
          </ul>
          <ul className="hidden sm:flex">
            <li>Résumé</li>
            <li className="ml-2">Projects</li>
          </ul>
        </div>
      </header>
      <div className="flex-1 mt-4">
        {/* <p>{JSON.stringify(locale)}</p> */}
        {/* <button>Click me</button> */}
      </div>
      <footer className="bg-black p-4 flex justify-between">
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
      </footer>
    </div>
  );
};

export default App;
