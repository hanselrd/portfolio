import { NextSeo } from "next-seo";
import React from "react";

interface PageProps {
  title?: string;
  description?: string;
}

const Page: React.FC<PageProps> = (props) => {
  return (
    <>
      <NextSeo
        title={`Hansel De La Cruz${props.title ? ` | ${props.title}` : ""}`}
        description={props.description}
        openGraph={{
          title: `Hansel De La Cruz${props.title ? ` | ${props.title}` : ""}`,
          description: props.description,
        }}
      />
      {props.children}
    </>
  );
};

export default Page;
