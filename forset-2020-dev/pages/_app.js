import App, { Container } from 'next/app';
import PropTypes from 'prop-types';
import Layout from 'components/Layout';

class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { router, ...pageProps };
  }

  render() {
    const {
      Component, router, ...pageProps
    } = this.props;

    return (
      <Container>
        <Layout router={router}>
          <Component {...pageProps} />
        </Layout>
      </Container>
    );
  }
}

export default MyApp;

MyApp.propTypes = {
  router: PropTypes.instanceOf(Object).isRequired,
};
