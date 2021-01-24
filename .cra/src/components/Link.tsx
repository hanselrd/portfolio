import clsx from "clsx";
import React from "react";
import { NavLink } from "react-router-dom";

interface LinkProps {
  embedded?: boolean;
  external?: boolean;
  to: string;
}

const Link: React.FC<LinkProps> = (props) => {
  return (
    <div className="font-semibold text-gray-300 cursor-pointer w-max hover:text-white">
      {!props.external ? (
        <NavLink
          to={props.to}
          className={clsx({ "px-1": !props.embedded })}
          activeClassName={clsx({ "border-b-4 border-white text-white": !props.embedded })}>
          {props.children}
        </NavLink>
      ) : (
        <a href={props.to} rel="noopener noreferrer" target="_blank">
          {props.children}
        </a>
      )}
    </div>
  );
};

export default Link;
