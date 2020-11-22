/**
 * styled-components Img@0.1.0 by sorosora
 */

import styled, { css } from 'styled-components';

const ImgCover = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  font-family: 'object-fit: cover;';
`;

const ImgContain = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  font-family: 'object-fit: contain;';
`;

const typeList = {
  'cover': css`
    width: 100%;
    height: 100%;
    object-fit: cover;
    font-family: ${({ ie }) => (ie ? 'object-fit: cover;' : '')};
  `,
  'contain': css`
     width: 100%;
    height: 100%;
    object-fit: contain;
    font-family: ${({ ie }) => (ie ? 'object-fit: contain;' : '')};
  `,
  'width': css`
    width: 100%;
  `,
  'height': css`
    height: 100%;
  `,
};

const Img = styled.img`
  ${({ type }) => typeList[type] || ''};
`;

export { ImgCover, ImgContain };
