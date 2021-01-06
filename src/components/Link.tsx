import clsx from "clsx";
import React from "react";
import { NavLink } from "react-router-dom";

interface LinkProps {
  first?: boolean;
  embedded?: boolean;
  external?: boolean;
  href?: string;
}

const Link: React.FC<LinkProps> = (props) => {
  return (
    <div className={clsx({ "ml-6": !props.first }, "cursor-pointer hover:text-white")}>
      {!props.external ? (
        <NavLink
          to={props.href}
          className={clsx({ "px-1": !props.embedded })}
          activeClassName={clsx({ "border-b-4 border-white text-white": !props.embedded })}>
          {props.children}
        </NavLink>
      ) : (
        <a href={props.href}>{props.children}</a>
      )}
    </div>
  );
};

export default Link;
