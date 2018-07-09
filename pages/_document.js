import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <html lang="en">
        <Head>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <link
            href="//fonts.googleapis.com/css?family=Raleway:400,300,600"
            rel="stylesheet"
            type="text/css"
          />
          <script src="https://use.fontawesome.com/d599b86078.js" />
          <link
            rel="stylesheet"
            type="text/css"
            href="/_next/static/style.css"
          />
          <link rel="icon" type="image/png" href="/static/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
