import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
        </Head>
        <body>
          {/*  Inline script so the correct class is set before React hydrates  */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                try {
                  var t = localStorage.getItem('theme') || 'dark';
                  document.documentElement.classList.toggle('dark', t === 'dark');
                } catch (_) {}
                `,
            }}
          />
          <Main />
          <div id="portal-root" /> {/* for modals */}
          <NextScript />
        </body>
      </Html>
    );
  }
}
