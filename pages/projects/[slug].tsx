import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import React from "react";

const ProjectsSlug: React.FC = () => {
  const router = useRouter();
  const slug = typeof router.query.slug === "string" ? router.query.slug : "";

  return (
    <>
      <NextSeo
        title={`Hansel De La Cruz | Project ${slug}`}
        canonical={`${process.env.NEXT_PUBLIC_URL!}/projects/${slug}`}
        openGraph={{
          url: `${process.env.NEXT_PUBLIC_URL!}/projects/${slug}`,
          title: `Hansel De La Cruz | Project ${slug}`,
        }}
      />
      <div>Project {slug}</div>
    </>
  );
};

export default ProjectsSlug;
