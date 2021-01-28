import Page from "@/components/Page";
import projects from "@/data/projects.json";
import _ from "lodash";
import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";

interface ProjectsSlugProps {
  project: typeof projects[0];
}

const ProjectsSlug: React.FC<ProjectsSlugProps> = (props) => {
  return (
    <>
      <Page
        namespace="Project"
        title={props.project.name}
        description={props.project.description || ""}
      >
        <div>Project {props.project.name}</div>
        <div>{props.project.description}</div>
        <div>{props.project.language}</div>
        <div>{props.project.license?.name}</div>
        <div>{props.project.html_url}</div>
      </Page>
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
    fallback: false
  };
};

export const getStaticProps: GetStaticProps<ProjectsSlugProps> = async (context) => {
  return {
    props: { project: projects.filter((project) => project.name === context.params?.slug)[0] }
  };
};

export default ProjectsSlug;
