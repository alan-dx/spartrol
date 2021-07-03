import Document, { Head, Main, NextScript, Html } from 'next/document'

export default class MyApp extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta name='application-name' content="spartrol" />
          <meta name='apple-mobile-web-app-capable' content='yes' />
          <meta name='apple-mobile-web-app-status-bar-style' content='default' />
          <meta name='apple-mobile-web-app-title' content="spartrol" />
          <meta name='description' content="An application to manage your expenses" />
          <meta name='format-detection' content='telephone=no' />
          <meta name='mobile-web-app-capable' content='yes' />
          <meta name='theme-color' content='#F5F5F5' />

          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;600&display=swap" rel="stylesheet" />

          {/* <link rel='apple-touch-icon' sizes='180x180' href='/icons/apple-touch-icon.png' /> */}
          <link rel='manifest' href='/manifest.json' />
          <link rel='shortcut icon' type="image/png" href='/favicon.png' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>

      </Html>
    )
  }
}