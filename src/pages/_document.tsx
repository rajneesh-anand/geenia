import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
import { i18n } from "next-i18next";
import { getDirection } from "@utils/get-direction";
import { GA_TRACKING_ID } from "@utils/ga";

export default class CustomDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    return Document.getInitialProps(ctx);
  }
  render() {
    // const { locale } = this.props.__NEXT_DATA__;
    // if (process.env.NODE_ENV !== "production") {
    //   i18n!.reloadResources(locale);
    // }
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <link rel="icon" type="image/x-icon" href="/favicon.ico"></link>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;700&family=Poppins:wght@400;500;600&display=swap"
            rel="stylesheet"
          />
          {/* <script
            type="text/javascript"
            crossOrigin="anonymous"
            src="https://securegw-stage.paytm.in/merchantpgpui/checkoutjs/merchants/zWEMTK89662017572077.js"
          /> */}
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />

          <script
            dangerouslySetInnerHTML={{
              __html: `              
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());            
              gtag('config', '${GA_TRACKING_ID}', {
                page: window.location.pathname
            });              
          `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
