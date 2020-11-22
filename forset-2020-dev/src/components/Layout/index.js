import Head from 'next/head';
import styled, { ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';
import routerEvents from 'next-router-events';
import NProgress from 'nprogress';
import Header from 'components/Header';
import Footer from 'components/Footer';
import appTheme from './theme-normal';

const StyledFooter = styled(Footer)``;

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: white;
  font-family: ${({ theme }) => theme.fontFamily.primary};

  ${StyledFooter} {
    margin-top: auto;
  }
`;

const MainWrapper = styled.div``;

routerEvents.on('routeChangeStart', NProgress.start);
routerEvents.on('routeChangeComplete', NProgress.done);
routerEvents.on('routeChangeError', NProgress.done);

const Layout = ({
  children, router
}) => {
  return (
    <ThemeProvider theme={appTheme}>
      <AppWrapper>
        <Head>
          <link rel='stylesheet' href='/static/vender/nprogress-normal.css' />
        </Head>
        <Header query={router.query} />
        <MainWrapper>
          {children}
        </MainWrapper>
        <StyledFooter />
      </AppWrapper>
    </ThemeProvider>
  );
};

export default Layout;

Layout.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
};
