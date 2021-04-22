import Document, {Html, Head, Main, NextScript} from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="proconnect" href="https://fonst.gstatic.com"/>
          <link rel="stylesheet" href="https://fonts.googlepis.com/css2?family=Inter&family=Lexend:wght@500;688&display=swap"/>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}