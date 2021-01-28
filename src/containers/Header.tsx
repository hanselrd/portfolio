import { DEV } from "@/core/environment";
import { useStoreActions, useStoreState } from "@/core/store";
import clsx from "clsx";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { HiMenuAlt1, HiMoon, HiOutlineBookmark, HiOutlineMoon } from "react-icons/hi";

const Header: React.FC = () => {
  const themeState = useStoreState((state) => state.theme);
  const themeActions = useStoreActions((actions) => actions.theme);
  const [showMenu, setShowMenu] = useState(false);
  const [pageYOffset, setPageYOffset] = useState(0);

  useEffect(() => {
    window.onscroll = () => {
      setPageYOffset(window.pageYOffset);
    };
  }, []);

  return (
    <>
      <header
        className={clsx(
          "bg-gray-100 dark:bg-gray-900 p-6 2xl:px-40 fixed left-0 top-0 w-full z-10 sm:px-8 md:px-10 lg:px-14 xl:px-24",
          { "shadow-md": pageYOffset > 0 }
        )}
      >
        <div className="container flex justify-between mx-auto">
          <button
            className="focus:outline-none sm:transform sm:transition-transform sm:ease-in-out sm:duration-500 sm:hover:scale-125"
            onClick={() => {
              setShowMenu(!showMenu);
            }}
          >
            <HiMenuAlt1 size={30} />
          </button>
          <Link href="/">
            <a className="flex">
              <span
                className={clsx({
                  "text-gray-600 dark:text-gray-400": !DEV,
                  "text-red-600 dark:text-red-400": DEV
                })}
              >
                <HiOutlineBookmark size={30} />
              </span>
              <span className="font-semibold text-lg my-auto">Hansel De La Cruz</span>
            </a>
          </Link>
          <button
            className="grid focus:outline-none sm:transform sm:transition-transform sm:ease-in-out sm:duration-500 sm:hover:scale-125"
            onClick={() => {
              themeActions.toggleMode();
            }}
          >
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
