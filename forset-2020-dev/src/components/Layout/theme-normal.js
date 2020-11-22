import { css } from 'styled-components';

const sizes = {
  desktop: 1440,
  tablet: 768,
  phone: 480,
};

const htmlFontSize = 16;

const normalLineHeight = 20 / 16;

const media = Object.keys(sizes)
  .reduce((acc, label) => {
    acc[label] = (...args) => css`
    @media (max-width: ${sizes[label] / htmlFontSize}em) {
      ${[...args].reduce(total => total)}
    }
  `;

    return acc;
  }, {});

const calcFontSize = fontSize => `${fontSize / htmlFontSize}rem`;

const fontFamily = {
  primary: '\'Noto Sans CJK TC\', \'PingFangTC\', \'微軟正黑體\', \'Microsoft JhengHei\', sans-serif',
  openSans: '\'Open Sans\', \'PingFangTC\', \'微軟正黑體\', \'Microsoft JhengHei\', sans-serif',
  pingFangTC: '\'PingFangTC\', \'微軟正黑體\', \'Microsoft JhengHei\', sans-serif',
};

const color = {
  white: '#ffffff',
  dark: '#333333',
  paleGrey: '#ababab',
  green: '#004D2C',
};

const text = {
  title: css`
    font-size: ${({ theme }) => theme.calcFontSize(50)};
    line-height: 1.19;
    letter-spacing: 2px;
  `,
  h1: css`
    font-size: ${({ theme }) => theme.calcFontSize(36)};
    line-height: 1.12;
    letter-spacing: 0;
  `,
  h2: css`
    font-size: ${({ theme }) => theme.calcFontSize(28)};
    line-height: 1.21;
    letter-spacing: 0;
  `,
  h3: css`
    font-size: ${({ theme }) => theme.calcFontSize(24)};
    line-height: 1.36;
    letter-spacing: 0;
  `,
  h4: css`
    font-size: ${({ theme }) => theme.calcFontSize(16)};
    line-height: 1.75;
    letter-spacing: 0;
  `,
  p: css`
    font-size: ${({ theme }) => theme.calcFontSize(14)};
    line-height: 1.86;
    letter-spacing: normal;
  `,
  body: css`
    font-size: ${({ theme }) => theme.calcFontSize(12)};
    line-height: 1.33;
    letter-spacing: normal;
  `,
};

const theme = {
  media,
  htmlFontSize,
  calcFontSize,
  normalLineHeight,
  fontFamily,
  color,
  text,
};

export default theme;

export { sizes };
