import React, { useEffect } from 'react';
import { FaBars, FaFacebook, FaGithub, FaLinkedin } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
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

  return (
    <div className="font-sans flex flex-col h-screen bg-gray-200">
      <header className="px-4 py-4 flex justify-between bg-gray-800 text-white">
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
      <main className="flex-1 mt-4 px-6">
        <p className="sm:hidden text-red-700 text-center">XS</p>
        <p className="hidden sm:block md:hidden text-blue-700 text-center">SM</p>
        <p className="hidden md:block lg:hidden text-green-700 text-center">MD</p>
        <p className="hidden lg:block xl:hidden text-yellow-700 text-center">LG</p>
        <p className="hidden xl:block text-purple-500 text-center">XL</p>
        <p>{JSON.stringify(locale)}</p>
        <p>{JSON.stringify(router)}</p>
        {/* <button>Click me</button> */}
      </main>
      <footer className="bg-black p-4 flex justify-between text-white">
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
