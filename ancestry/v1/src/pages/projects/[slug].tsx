import Page from "@/components/Page";
import projects from "@/data/projects.json";
import { I18nTable } from "@/i18n";
import _ from "lodash";
import { GetStaticPaths, GetStaticProps } from "next";
import { I18nProps, useI18n } from "next-rosetta";
import React from "react";

interface ProjectsSlugProps {
  project: typeof projects[0];
}

const ProjectsSlug: React.FC<ProjectsSlugProps> = (props) => {
  const i18n = useI18n<I18nTable>();

  return (
    <>
      <Page
        namespace={i18n.t("pages.projectsSlug.namespace")}
        title={props.project.name}
        description={props.project.description || ""}
      >
        <div>{i18n.t("pages.projectsSlug.title", { slug: props.project.name })}</div>
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
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<I18nProps<I18nTable> & ProjectsSlugProps> = async (
  context
) => {
  const locale = context.locale! || context.defaultLocale!;
  const { table = {} } = await import(`@/i18n/${locale}`);
  return {
    props: {
      table,
      project: projects.filter((project) => project.name === context.params?.slug)[0],
    },
  };
};

export default ProjectsSlug;
