import { useStoreState } from "@/core/store";
import React from "react";

const Header: React.FC = () => {
  const theme = useStoreState((state) => state.theme);

  return (
    <header className="fixed top-0 left-0 z-10 w-full p-6 m-auto shadow-md">
      <div className="container flex justify-between m-auto sm:px-2 md:px-4 lg:px-8 xl:px-16">
        <div>1</div>
        <div>Hansel De La Cruz</div>
        <div>Home</div>
        <div>4</div>
      </div>
    </header>
  );
};

export default Header;
