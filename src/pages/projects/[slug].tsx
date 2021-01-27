import { NEXT_PUBLIC_URL } from "@/core/environment";
import projects from "@/data/projects.json";
import _ from "lodash";
import { GetStaticPaths, GetStaticProps } from "next";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import React from "react";

interface ProjectsSlugProps {
  project: typeof projects[0];
}

const ProjectsSlug: React.FC<ProjectsSlugProps> = (props) => {
  const router = useRouter();

  const slug = typeof router.query.slug === "string" ? router.query.slug : "";

  return (
    <>
      <NextSeo
        title={`Hansel De La Cruz | ${props.project.name}`}
        description={props.project.description || ""}
        canonical={`${NEXT_PUBLIC_URL}/projects/${slug}`}
        openGraph={{
          url: `${NEXT_PUBLIC_URL}/projects/${slug}`,
          title: `Hansel De La Cruz | ${props.project.name}`,
          description: props.project.description || "",
        }}
      />
      <div>Project {props.project.name}</div>
      <div>{props.project.description}</div>
      <div>{props.project.language}</div>
      <div>{props.project.license?.name}</div>
      <div>{props.project.html_url}</div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  return {
    paths: _.flattenDeep(
      context.locales!.map((locale) =>
        projects.map((project) => ({ params: { slug: project.name }, locale }))
      )
    ),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<ProjectsSlugProps> = async (context) => {
  return {
    props: { project: projects.filter((project) => project.name === context.params?.slug)[0] },
  };
};

export default ProjectsSlug;
