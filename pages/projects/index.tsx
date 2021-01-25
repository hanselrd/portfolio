import { NextSeo } from "next-seo";
import React from "react";

const ProjectsIndex: React.FC = () => {
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
      <div>Projects</div>
    </>
  );
};

export default ProjectsIndex;
