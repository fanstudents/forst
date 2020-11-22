import Head from 'next/head';
import styled, { css } from 'styled-components';
import { GridWrapper } from 'components/share/Grid';

const IndexWrapper = styled.div``;

const Index = () => (
  <IndexWrapper>
    <Head>
      <title>Index</title>
    </Head>
    <GridWrapper>
      forest-2020 with Next.js
    </GridWrapper>
  </IndexWrapper>
);

export default Index;
