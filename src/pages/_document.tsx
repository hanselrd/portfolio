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
      <Html>
        <Head />
        <body className="bg-gray-100 dark:bg-gray-900 font-poppins dark:text-white transition-colors duration-500 tap-highlight-none">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
