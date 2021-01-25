import { useStoreActions, useStoreState } from "@/core/store";
import { BookmarkOutline, MenuAlt1, Moon, MoonOutline } from "heroicons-react";
import React from "react";
import { animated, useTransition } from "react-spring";

const Header: React.FC = () => {
  const theme = useStoreState((state) => state.theme);
  const themeToggleMode = useStoreActions((actions) => actions.theme.toggleMode);
  const transitions = useTransition(theme.mode === "dark", null, {
    from: { position: "absolute", transform: "translate3d(-100%,0,0)", opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  return (
    <header className="fixed top-0 left-0 z-10 w-full p-6 shadow-md">
      <div className="container flex justify-between mx-auto sm:px-2 md:px-4 lg:px-8 xl:px-16">
        <div>
          <MenuAlt1 size={40} />
        </div>
        <div className="flex my-auto ">
          <BookmarkOutline size={30} />{" "}
          <span className="my-auto text-xl font-semibold">Hansel De La Cruz</span>
        </div>
        <div
          className="relative"
          onClick={() => {
            themeToggleMode();
          }}>
          {transitions.map(({ item, props, key }) =>
            item ? (
              <animated.div key={key} style={props}>
                <Moon size={40} />
              </animated.div>
            ) : (
              <animated.div key={key} style={props}>
                <MoonOutline size={40} />
              </animated.div>
            )
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
