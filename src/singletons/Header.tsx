import React from 'react';
import { FaBars, FaGlobeAmericas, FaRegBookmark } from 'react-icons/fa';
/* import { useDispatch, useSelector } from 'react-redux'; */
/* import { RootState } from '../ducks'; */

const Header: React.FC = () => {
  /* const dispatch = useDispatch(); */
  /* const state = useSelector((state: RootState) => ({ locale: state.locale, router: state.router })); */

  return (
    <header className="bg-gray-900 fixed text-gray-300 w-full p-6 m-auto z-10 shadow-md">
      <div className="container flex m-auto justify-between sm:px-2 md:px-4 lg:px-8 xl:px-16">
        <div className="flex my-auto">
          <div className="flex sm:hidden">
            <FaBars className="my-auto hover:text-white" />
          </div>
          <div className="flex ml-6 my-auto sm:ml-0">
            <FaRegBookmark className="my-auto text-xl text-gray-600" />
            <span className="ml-1 font-bold text-white">Hansel De La Cruz</span>
          </div>
          <div className="hidden ml-12 m-auto sm:block">
            <ul className="text-xs font-bold flex">
              <li className="text-white border-b-4 border-white">Home</li>
              <li className="ml-6 hover:text-white">Projects</li>
              <li className="ml-6 hover:text-white">CV</li>
            </ul>
          </div>
        </div>
        <div className="flex my-auto hover:text-white">
          <FaGlobeAmericas className="my-auto" />
          <span className="ml-1 text-xs font-bold uppercase">en</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
