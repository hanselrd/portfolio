import { DEV } from "@/core/environment";
import React from "react";
import {
  FaCopyright,
  FaFacebookSquare,
  FaGithub,
  FaHammer,
  FaLinkedinIn,
  FaTrashAlt,
} from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <>
      <footer className="bg-black 2xl:px-40 px-6 py-20 text-white w-full sm:px-8 md:px-10 lg:px-14 xl:px-24">
        <div className="container space-y-10 flex flex-col mx-auto">
          <div className="space-x-8 flex justify-center font-medium text-sm">
            <span>About Me</span>
            <span>Contact</span>
          </div>
          <div className="space-x-12 flex justify-center">
            <FaFacebookSquare size={30} />
            <FaGithub size={30} />
            <FaLinkedinIn size={30} />
          </div>
          <div className="space-x-1 flex justify-center text-xs text-gray-400">
            <span className="my-auto">
              <FaCopyright />
            </span>
            <span>Copyright {new Date().getFullYear()}</span>
            <span className="font-bold">Hansel De La Cruz</span>
          </div>
          {DEV && (
            <div className="space-x-1 flex justify-center text-xs text-red-400">
              <span className="my-auto">
                <FaHammer />
              </span>
              <span>Development version</span>
            </div>
          )}
          {DEV && (
            <div className="flex justify-center">
              <button
                onClick={() => {
                  localStorage.clear();
                  sessionStorage.clear();

                  const cookies = document.cookie.split(";");
                  for (const cookie of cookies) {
                    document.cookie = cookie + "=;expires=" + new Date(0).toUTCString();
                  }
                }}
                className="space-x-1 bg-red-600 flex text-xs focus:outline-none p-3 sm:transform sm:transition-transform sm:ease-in-out sm:duration-500 sm:hover:scale-110">
                <span className="my-auto">
                  <FaTrashAlt />
                </span>
                <span>Clear storage</span>
              </button>
            </div>
          )}
        </div>
      </footer>
    </>
  );
};

export default Footer;
