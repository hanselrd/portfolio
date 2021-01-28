import D, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript
} from "next/document";
import React from "react";

class Document extends D {
  public static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const initialProps = await D.getInitialProps(ctx);
    return initialProps;
  }

  public render(): JSX.Element {
    return (
      <Html
        lang={
          this.props.__NEXT_DATA__.locale ? this.props.__NEXT_DATA__.locale.split("-")[0] : "en"
        }
      >
        <Head />
        <body className="bg-gray-100 font-poppins transition-colors duration-500 dark:bg-gray-900 dark:text-white tap-highlight-none">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
