import { NextSeo } from "next-seo";
import React from "react";

const Home: React.FC = () => {
  return (
    <>
      <NextSeo
        title="Hansel De La Cruz | Home"
        canonical={`${process.env.NEXT_PUBLIC_URL!}/home`}
        openGraph={{
          url: `${process.env.NEXT_PUBLIC_URL!}/home`,
          title: "Hansel De La Cruz | Home",
        }}
      />
      <div>Home</div>
    </>
  );
};

export default Home;
