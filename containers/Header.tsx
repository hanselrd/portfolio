import { useStoreActions, useStoreState } from "@/core/store";
import { BookmarkOutline, MenuAlt1, Moon, MoonOutline } from "heroicons-react";
import React, { useState } from "react";

const Header: React.FC = () => {
  const themeState = useStoreState((state) => state.theme);
  const themeActions = useStoreActions((actions) => actions.theme);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <header className="bg-gray-100 dark:bg-gray-900 p-6 fixed left-0 top-0 shadow-md w-full z-10">
        <div className="container flex justify-between mx-auto sm:px-2 md:px-4 lg:px-8 xl:px-16">
          <button
            onClick={() => {
              setShowMenu(!showMenu);
            }}
            className="my-auto focus:outline-none transform hover:scale-125 transition-transform ease-in-out duration-500">
            <MenuAlt1 size={30} />
          </button>
          <div className="flex my-auto">
            <span className="dark:text-gray-400 text-gray-600">
              <BookmarkOutline size={30} />
            </span>
            <span className="font-semibold text-lg my-auto">Hansel De La Cruz</span>
          </div>
          <button
            onClick={() => {
              themeActions.toggleMode();
            }}
            className="grid my-auto focus:outline-none transform hover:scale-125 transition-transform ease-in-out duration-500">
            {themeState.mode &&
              (themeState.mode === "dark" ? (
                <span className="col-start-1 row-start-1">
                  <Moon size={30} />
                </span>
              ) : (
                <span className="col-start-1 row-start-1">
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
