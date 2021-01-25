import { NextSeo } from "next-seo";
import Link from "next/link";
import React from "react";

const Index: React.FC = () => {
  return (
    <>
      <NextSeo
        title="Hansel De La Cruz | Home"
        openGraph={{
          title: "Hansel De La Cruz | Home",
        }}
      />
      <div>
        <Link href="/">
          <a className="hover:underline">Home</a>
        </Link>
        <Link href="/projects">
          <a className="hover:underline">Projects</a>
        </Link>
      </div>
    </>
  );
};

export default Index;
