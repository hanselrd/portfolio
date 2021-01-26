import React from "react";
import { FaCopyright, FaFacebookSquare, FaGithub, FaLinkedinIn } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <>
      <footer className="bg-black 2xl:px-40 px-6 py-20 text-white w-full sm:px-8 md:px-10 lg:px-14 xl:px-24">
        <div className="container space-y-10 flex flex-col mx-auto">
          <div>
            <ul className="space-x-8 flex justify-center font-medium text-sm">
              <li>About Me</li>
              <li>Contact</li>
            </ul>
          </div>
          <div>
            <ul className="space-x-12 flex justify-center">
              <li>
                <FaFacebookSquare size={30} />
              </li>
              <li>
                <FaGithub size={30} />
              </li>
              <li>
                <FaLinkedinIn size={30} />
              </li>
            </ul>
          </div>
          <div className="space-x-1 flex justify-center text-xs text-gray-400">
            <span className="my-auto">
              <FaCopyright />
            </span>
            <span>Copyright {new Date().getFullYear()}</span>
            <span className="font-bold">Hansel De La Cruz</span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
