import { useStoreActions, useStoreState } from "@/core/store";
import React, { useState } from "react";
import { HiMenuAlt1, HiMoon, HiOutlineBookmark, HiOutlineMoon } from "react-icons/hi";

const Header: React.FC = () => {
  const themeState = useStoreState((state) => state.theme);
  const themeActions = useStoreActions((actions) => actions.theme);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <header className="bg-gray-100 dark:bg-gray-900 p-6 2xl:px-40 fixed left-0 top-0 shadow-md w-full z-10 sm:px-8 md:px-10 lg:px-14 xl:px-24">
        <div className="container flex justify-between mx-auto">
          <button
            onClick={() => {
              setShowMenu(!showMenu);
            }}
            className="my-auto focus:outline-none sm:transform sm:transition-transform sm:ease-in-out sm:duration-500 sm:hover:scale-125">
            <HiMenuAlt1 size={30} />
          </button>
          <div className="flex my-auto">
            <span className="dark:text-gray-400 text-gray-600">
              <HiOutlineBookmark size={30} />
            </span>
            <span className="font-semibold text-lg my-auto">Hansel De La Cruz</span>
          </div>
          <button
            onClick={() => {
              themeActions.toggleMode();
            }}
            className="grid my-auto focus:outline-none sm:transform sm:transition-transform sm:ease-in-out sm:duration-500 sm:hover:scale-125">
            {themeState.mode &&
              (themeState.mode === "dark" ? (
                <span className="col-start-1 row-start-1">
                  <HiMoon size={30} />
                </span>
              ) : (
                <span className="col-start-1 row-start-1">
                  <HiOutlineMoon size={30} />
                </span>
              ))}
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;