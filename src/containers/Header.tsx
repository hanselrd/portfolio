import Link from "@/components/Link";
import { DEV } from "@/core/environment";
import { useStoreActions, useStoreState } from "@/core/store";
import { I18nTable } from "@/i18n";
import clsx from "clsx";
import { useI18n } from "next-rosetta";
import React, { useEffect, useState } from "react";
import { HiMenu, HiMoon, HiOutlineBookmark, HiOutlineMoon, HiTranslate } from "react-icons/hi";

const Header: React.FC = () => {
  const i18n = useI18n<I18nTable>();
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
          "bg-gray-100 p-6 fixed left-0 top-0 w-full z-10 dark:bg-gray-900 sm:px-8 md:px-10 lg:px-14 xl:px-24 2xl:px-40",
          { "shadow-md": pageYOffset > 0 }
        )}
      >
        <div className="container flex justify-between mx-auto">
          <button
            className="focus:outline-none sm:transform sm:transition-transform sm:ease-in-out sm:duration-500 md:hidden sm:hover:scale-125"
            onClick={() => {
              setShowMenu(!showMenu);
            }}
          >
            <HiMenu size={30} />
          </button>
          <div className="space-x-14 flex rtl:space-x-reverse xl:space-x-16">
            <Link className="flex" embedded href="/">
              <span
                className={clsx({
                  "text-gray-600 dark:text-gray-400": !DEV,
                  "text-red-600 dark:text-red-400": DEV,
                })}
              >
                <HiOutlineBookmark size={30} />
              </span>
              <span dir="ltr" className="font-semibold text-lg my-auto xs:hidden">
                Hansel D.
              </span>
              <span className="hidden font-semibold text-lg my-auto xs:inline">
                Hansel De La Cruz
              </span>
            </Link>
            <nav className="space-x-4 flex hidden my-auto rtl:space-x-reverse md:block lg:space-x-6 xl:space-x-8">
              <Link href="/home">{i18n.t("pages.home.title")}</Link>
              <Link href="/projects">{i18n.t("pages.projectsIndex.title")}</Link>
              <Link href="/resume">{i18n.t("pages.resume.title")}</Link>
            </nav>
          </div>
          <div className="space-x-1 flex rtl:space-x-reverse xs:space-x-2 sm:space-3">
            <button className="focus:outline-none sm:transform sm:transition-transform sm:ease-in-out sm:duration-500 sm:hover:scale-125">
              <HiTranslate size={30} />
            </button>
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
        </div>
      </header>
    </>
  );
};

export default Header;
