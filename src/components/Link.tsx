import clsx from "clsx";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";

interface LinkProps {
  className?: string;
  embedded?: boolean;
  external?: boolean;
  href: string;
  locale?: string | false;
}

const Link: React.FC<LinkProps> = (props) => {
  const router = useRouter();

  return (
    <>
      {!props.external ? (
        <NextLink href={props.href} locale={props.locale}>
          <a
            className={clsx(props.className, "w-max", {
              "pointer-events-none":
                `${props.locale ? props.locale : router.locale!}${props.href}` ===
                `${router.locale!}${router.asPath}`,
              "sm:transform sm:transition-transform sm:ease-in-out sm:duration-500 sm:hover:scale-125": !props.embedded,
            })}
          >
            {props.children}
          </a>
        </NextLink>
      ) : (
        <a
          className={clsx(props.className, "w-max", {
            "sm:transform sm:transition-transform sm:ease-in-out sm:duration-500 sm:hover:scale-125": !props.embedded,
          })}
          href={props.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {props.children}
        </a>
      )}
    </>
  );
};

export default Link;
