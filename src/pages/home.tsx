import { NEXT_PUBLIC_URL } from "@/core/environment";
import { NextSeo } from "next-seo";
import React from "react";

const Home: React.FC = () => {
  return (
    <>
      <NextSeo
        title="Hansel De La Cruz | Home"
        canonical={`${NEXT_PUBLIC_URL}/home`}
        openGraph={{
          url: `${NEXT_PUBLIC_URL}/home`,
          title: "Hansel De La Cruz | Home",
        }}
      />
      <div>Home</div>
    </>
  );
};

export default Home;
