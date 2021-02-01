import Page from "@/components/Page";
import { I18nTable } from "@/i18n";
import { GetStaticProps } from "next";
import { I18nProps, useI18n } from "next-rosetta";
import { ErrorProps } from "next/error";
import React from "react";

const Error: React.FC<ErrorProps> = (props) => {
  const i18n = useI18n<I18nTable>();

  return (
    <>
      <Page
        namespace={props.statusCode ? props.statusCode.toString() : "404"}
        title={i18n.t("pages.error.title")}
      >
        <h1>{props.statusCode ? props.statusCode.toString() : "404"}</h1>
        <h2>{i18n.t("pages.error.title")}</h2>
      </Page>
    </>
  );
};

export const getStaticProps: GetStaticProps<I18nProps<I18nTable>> = async (context) => {
  const locale = context.locale! || context.defaultLocale!;
  const { table = {} } = await import(`@/i18n/${locale}`);
  return { props: { table } };
};

export default Error;
