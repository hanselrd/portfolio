import Link from "@/components/Link";
import Page from "@/components/Page";
import projects from "@/data/projects.json";
import { I18nTable } from "@/i18n";
import { GetStaticProps } from "next";
import { I18nProps, useI18n } from "next-rosetta";
import React from "react";

const ProjectsIndex: React.FC = () => {
  const i18n = useI18n<I18nTable>();

  return (
    <>
      <Page
        title={i18n.t("pages.projectsIndex.title")}
        description={i18n.t("pages.projectsIndex.description")}
      >
        <div className="space-y-6 flex flex-col">
          <h1 className="flex justify-center font-bold text-2xl">
            {i18n.t("pages.projectsIndex.title")}
          </h1>
          <div className="space-y-2 flex flex-col">
            {projects.map((project, index) => (
              <Link
                key={index}
                className="flex justify-center mx-auto"
                href={`/projects/${project.name}`}
              >
                {project.name}
              </Link>
            ))}
          </div>
        </div>
      </Page>
    </>
  );
};

export const getStaticProps: GetStaticProps<I18nProps<I18nTable>> = async (context) => {
  const locale = context.locale! || context.defaultLocale!;
  const { table = {} } = await import(`@/i18n/${locale}`);
  return { props: { table } };
};

export default ProjectsIndex;
