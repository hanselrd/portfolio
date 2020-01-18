import React from 'react';
import { FaFacebook, FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="px-4 py-16 mt-4 text-white bg-gray-900">
      <div className="flex justify-between">
        <div className="text-sm font-semibold">
          <ul className="flex">
            <li>About Me</li>
            <li className="ml-2">Contact</li>
          </ul>
        </div>
        <div className="text-lg">
          <ul className="flex">
            <li>
              <FaFacebook />
            </li>
            <li className="ml-3">
              <FaLinkedin />
            </li>
            <li className="ml-3">
              <FaGithub />
            </li>
          </ul>
        </div>
      </div>
      <hr className="my-8 border-0 border-gray-800" />
      <div className="w-full text-xs text-center text-gray-300">
        <span>&copy; Copyright 2020</span> <span className="font-bold">Hansel De La Cruz</span>
      </div>
    </footer>
  );
};

export default Footer;
