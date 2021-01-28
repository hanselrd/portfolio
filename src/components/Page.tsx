import { NextSeo } from "next-seo";
import React from "react";

interface PageProps {
  namespace?: string;
  title?: string;
  description?: string;
}

const Page: React.FC<PageProps> = (props) => {
  return (
    <>
      <NextSeo
        title={`${props.namespace ? `${props.namespace}: ` : ""}${
          props.title ? `${props.title}` : ""
        }${props.namespace || props.title ? " | " : ""}Hansel De La Cruz`}
        description={props.description}
        openGraph={{
          title: `${props.namespace ? `${props.namespace}: ` : ""}${
            props.title ? `${props.title}` : ""
          }${props.namespace || props.title ? " | " : ""}Hansel De La Cruz`,
          description: props.description
        }}
      />
      {props.children}
    </>
  );
};

export default Page;
