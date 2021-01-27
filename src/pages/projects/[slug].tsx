import { NEXT_PUBLIC_URL } from "@/core/environment";
import projects, { Project } from "@/data/projects";
import _ from "lodash";
import { GetStaticPaths, GetStaticProps } from "next";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import React from "react";

interface ProjectsSlugProps {
  project: Project;
}

const ProjectsSlug: React.FC<ProjectsSlugProps> = (props) => {
  const router = useRouter();
  const slug = typeof router.query.slug === "string" ? router.query.slug : "";

  return (
    <>
      <NextSeo
        title={`Hansel De La Cruz | ${props.project.title}`}
        description={props.project.description}
        canonical={`${NEXT_PUBLIC_URL}/projects/${slug}`}
        openGraph={{
          url: `${NEXT_PUBLIC_URL}/projects/${slug}`,
          title: `Hansel De La Cruz | ${props.project.title}`,
          description: props.project.description,
        }}
      />
      <div>Project {JSON.stringify(props.project)}</div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  return {
    paths: _.flattenDeep(
      context.locales!.map((locale) =>
        projects.map((project) => ({ params: { slug: project.slug }, locale }))
      )
    ),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<ProjectsSlugProps> = async (context) => {
  return {
    props: { project: projects.filter((project) => project.slug === context.params?.slug)[0] },
  };
};

export default ProjectsSlug;
