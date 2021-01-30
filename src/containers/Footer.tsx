import Link from "@/components/Link";
import { DEV } from "@/core/environment";
import { I18nTable } from "@/i18n";
import { useI18n } from "next-rosetta";
import React from "react";
import { FaCopyright, FaFacebookSquare, FaGithub, FaHammer, FaLinkedinIn } from "react-icons/fa";

const Footer: React.FC = () => {
  const i18n = useI18n<I18nTable>();

  return (
    <>
      <footer className="bg-black px-6 py-20 text-white w-full sm:px-8 md:px-10 lg:px-14 xl:px-24 2xl:px-40">
        <div className="container space-y-10 flex flex-col mx-auto">
          <div className="space-x-8 flex justify-center font-medium text-sm rtl:space-x-reverse">
            <Link href="/about">{i18n.t("pages.about.title")}</Link>
            <Link href="/contact">{i18n.t("pages.contact.title")}</Link>
          </div>
          <div className="space-x-12 flex justify-center rtl:space-x-reverse">
            <Link external href="https://www.facebook.com/hansel.delacruz.14">
              <FaFacebookSquare size={30} />
            </Link>
            <Link external href="https://github.com/hanselrd">
              <FaGithub size={30} />
            </Link>
            <Link external href="https://www.linkedin.com/in/hansel-de-la-cruz-532199144">
              <FaLinkedinIn size={30} />
            </Link>
          </div>
          <div dir="ltr" className="space-x-1 flex justify-center text-xs text-gray-400">
            <span className="my-auto">
              <FaCopyright />
            </span>
            <span>Copyright {new Date().getFullYear()}</span>
            <Link className="font-bold" embedded href="/">
              Hansel De La Cruz
            </Link>
          </div>
          {DEV && (
            <div className="space-x-1 flex justify-center text-xs text-red-400 rtl:space-x-reverse">
              <span className="my-auto">
                <FaHammer />
              </span>
              <span>{i18n.t("common.developmentVersion")}</span>
            </div>
          )}
        </div>
      </footer>
    </>
  );
};

export default Footer;
