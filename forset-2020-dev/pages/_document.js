import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet, injectGlobal } from 'styled-components';
import reset from 'styled-reset';

injectGlobal`
  * {
    color: inherit;
    letter-spacing: inherit;
    outline-color: black;
  }
  
  html {
    font-size: 100%;
  }

  body {
    background-color: white;
  }

  ${reset}

  button, input, textarea {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  
  button {
    outline: none;
  }
  
  a {
    text-decoration: none;
  }
  
  div {
    box-sizing: border-box;
  }
`;

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />));
    const styleTags = sheet.getStyleElement();
    return {
      ...page,
      styleTags,
    };
  }

  render() {
    return (
      <html lang='zh-TW'>
        <Head>
          {this.props.styleTags}
          <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=3.0' />
          <meta name='theme-color' content='#000000' />
          {/* <link rel='icon' href='/static/images/logo/logo-favicon.png' /> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
