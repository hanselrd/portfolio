import Link from "next/link";
import React from "react";

const Index: React.FC = () => {
  return (
    <div>
      <Link href="/">
        <a className="hover:underline">Home</a>
      </Link>
      <Link href="/projects">
        <a className="hover:underline">Projects</a>
      </Link>
    </div>
  );
};

export default Index;
