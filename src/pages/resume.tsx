import Page from "@/components/Page";
import { I18nTable } from "@/i18n";
import { GetStaticProps } from "next";
import { I18nProps, useI18n } from "next-rosetta";
import React from "react";

const Resume: React.FC = () => {
  const i18n = useI18n<I18nTable>();

  return (
    <>
      <Page title={i18n.t("pages.resume.title")}>
        <h1>{i18n.t("pages.resume.title")}</h1>
      </Page>
    </>
  );
};

export const getStaticProps: GetStaticProps<I18nProps<I18nTable>> = async (context) => {
  const locale = context.locale! || context.defaultLocale!;
  const { table = {} } = await import(`@/i18n/${locale}`);
  return { props: { table } };
};

export default Resume;
