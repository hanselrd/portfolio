import React from "react";
import { FaFacebookSquare, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="px-4 py-16 mt-4 text-gray-300 bg-gray-900">
      <div className="block sm:flex">
        <ul className="flex justify-center w-full text-xs font-bold">
          <li className="cursor-pointer hover:text-white">
            <NavLink to="/aboutme">About Me</NavLink>
          </li>
          <li className="ml-6 cursor-pointer hover:text-white">
            <NavLink to="/contact">Contact</NavLink>
          </li>
        </ul>
        <hr className="my-8 border-0 border-gray-800 sm:hidden" />
        <ul className="flex justify-center w-full text-2xl">
          <li className="cursor-pointer hover:text-white">
            <FaFacebookSquare />
          </li>
          <li className="ml-8 cursor-pointer hover:text-white">
            <FaLinkedinIn />
          </li>
          <li className="ml-8 cursor-pointer hover:text-white">
            <FaGithub />
          </li>
        </ul>
      </div>
      <hr className="my-8 border-0 border-gray-800" />
      <div className="w-full text-xs text-center text-gray-300">
        <span>&copy; Copyright {new Date().getFullYear()}</span>{" "}
        <span className="font-bold">Hansel De La Cruz</span>
      </div>
    </footer>
  );
};

export default Footer;
