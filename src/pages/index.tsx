import { DEV } from "@/core/environment";
import { Table } from "@/i18n";
import { GetStaticProps } from "next";
import { I18nProps, useI18n } from "next-rosetta";
import React from "react";

const Index: React.FC = () => {
  const i18n = useI18n<Table>();

  return (
    <>
      <div>Landing</div>
      <div>{JSON.stringify({ DEV })}</div>
      <div>{i18n.t("title")}</div>
      <div>{i18n.t("welcome", { name: "John" })}</div>
    </>
  );
};

export const getStaticProps: GetStaticProps<I18nProps<Table>> = async (context) => {
  const locale = context.locale! || context.defaultLocale!;
  const { table = {} } = await import(`@/i18n/${locale}`);
  return { props: { table } };
};

export default Index;
