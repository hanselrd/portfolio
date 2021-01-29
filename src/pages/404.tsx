import Page from "@/components/Page";
import { DEV } from "@/core/environment";
import { I18nTable } from "@/i18n";
import { GetStaticProps } from "next";
import { I18nProps, useI18n } from "next-rosetta";
import React from "react";

const Error404: React.FC = () => {
  const i18n = useI18n<I18nTable>();

  return (
    <>
      <Page
        namespace="404"
        title="This page could not be found"
        description="This page could not be found"
      >
        <div>404</div>
        <div>{JSON.stringify({ DEV })}</div>
        <div>{i18n.t("title")}</div>
        <div>{i18n.t("welcome", { name: "Hansel" })}</div>
      </Page>
    </>
  );
};

export const getStaticProps: GetStaticProps<I18nProps<I18nTable>> = async (context) => {
  const locale = context.locale! || context.defaultLocale!;
  const { table = {} } = await import(`@/i18n/${locale}`);
  return { props: { table } };
};

export default Error404;
