import Link from "@/components/Link";
import Page from "@/components/Page";
import { I18nTable } from "@/i18n";
import { GetStaticProps } from "next";
import { I18nProps, useI18n } from "next-rosetta";
import { useRouter } from "next/router";
import React from "react";

const Index: React.FC = () => {
  const router = useRouter();
  const i18n = useI18n<I18nTable>();

  return (
    <>
      <Page title={i18n.t("pages.index.title")}>
        <div>{i18n.t("pages.index.title")}</div>
        <div className="flex flex-col">
          {router.locales &&
            router.locales.map((locale, index) => (
              <Link key={index} href={router.asPath} locale={locale}>
                {locale}
              </Link>
            ))}
          <Link href="/">{i18n.t("pages.index.title")}</Link>
          <Link href="/home">{i18n.t("pages.home.title")}</Link>
          <Link href="/projects">{i18n.t("pages.projectsIndex.title")}</Link>
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

export default Index;
