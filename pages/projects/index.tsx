import { useStoreState } from "@/core/store";
import Link from "next/link";
import React from "react";

const Index: React.FC = () => {
  const theme = useStoreState((state) => state.theme);

  return (
    <div>
      <Link href="/">
        <a className="hover:underline">Home</a>
      </Link>
      <img src="/logo.png" alt="Logo" />
      <div>{JSON.stringify(theme)}</div>
    </div>
  );
};

export default Index;
