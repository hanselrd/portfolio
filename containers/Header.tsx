import { useStoreActions, useStoreState } from "@/core/store";
import { BookmarkOutline, MenuAlt1, Moon, MoonOutline } from "heroicons-react";
import React, { useState } from "react";

const Header: React.FC = () => {
  const themeState = useStoreState((state) => state.theme);
  const themeActions = useStoreActions((actions) => actions.theme);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 z-10 w-full p-6 bg-gray-100 shadow-md dark:bg-gray-900">
        <div className="container flex justify-between mx-auto sm:px-2 md:px-4 lg:px-8 xl:px-16">
          <button
            onClick={() => {
              setShowMenu(!showMenu);
            }}
            className="my-auto focus:outline-none transition-transform transform hover:scale-125 ease-in-out duration-500">
            <MenuAlt1 size={30} />
          </button>
          <div className="flex my-auto">
            <span className="text-gray-600 dark:text-gray-400">
              <BookmarkOutline size={30} />
            </span>
            <span className="my-auto text-lg font-semibold">Hansel De La Cruz</span>
          </div>
          <button
            onClick={() => {
              themeActions.toggleMode();
            }}
            className="my-auto grid focus:outline-none transition-transform transform hover:scale-125 ease-in-out duration-500">
            {themeState.mode &&
              (themeState.mode === "dark" ? (
                <span className="row-start-1 col-start-1">
                  <Moon size={30} />
                </span>
              ) : (
                <span className="row-start-1 col-start-1">
                  <MoonOutline size={30} />
                </span>
              ))}
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;
