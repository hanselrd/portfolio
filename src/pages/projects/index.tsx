import { NEXT_PUBLIC_URL } from "@/core/environment";
import { NextSeo } from "next-seo";
import React from "react";

const ProjectsIndex: React.FC = () => {
  return (
    <>
      <NextSeo
        title="Hansel De La Cruz | Projects"
        canonical={`${NEXT_PUBLIC_URL}/projects`}
        openGraph={{
          url: `${NEXT_PUBLIC_URL}/projects`,
          title: "Hansel De La Cruz | Projects",
        }}
      />
      <div>Projects</div>
    </>
  );
};

export default ProjectsIndex;
