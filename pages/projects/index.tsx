import { useStoreState } from "@/core/store";
import { NextSeo } from "next-seo";
import Link from "next/link";
import React from "react";

const Index: React.FC = () => {
  const theme = useStoreState((state) => state.theme);

  return (
    <>
      <NextSeo
        title="Hansel De La Cruz | Projects"
        canonical={`${process.env.NEXT_PUBLIC_URL!}/projects`}
        openGraph={{
          url: `${process.env.NEXT_PUBLIC_URL!}/projects`,
          title: "Hansel De La Cruz | Projects",
        }}
      />
      <div>
        <Link href="/">
          <a className="hover:underline">Home</a>
        </Link>
        <img src="/logo.png" alt="Logo" />
        <div>{JSON.stringify(theme)}</div>
      </div>
    </>
  );
};

export default Index;
