/**
 * styled-components RatioBox@0.0.10 by sorosora
 */

import styled, { css } from 'styled-components';

const checkBreak = (value, expectedValue) => (value === 'break' ? expectedValue : value);

const RatioContainer = styled.div``;

const RatioWrapper = styled.div`
  position: relative;
  padding-bottom: ${({ height }) => (height && height[0] ? height[0] : '')};
  height: 0;
  
  ${RatioContainer} {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  
  ${({ theme }) => theme.media.tablet(css`
    padding-bottom: ${({ height }) => (height && height[1] ? checkBreak(height[1], 0) : '')};
    height: ${({ height }) => (height && height[1] === 'break' ? 'auto' : '')};;
    
    ${RatioContainer} {
      position: ${({ height }) => (height && height[1] === 'break' ? 'relative' : '')};;
    }
  `)};
  
  ${({ theme }) => theme.media.phone(css`
    padding-bottom: ${({ height }) => (height && height[2] ? checkBreak(height[2], 0) : '')};
    height: ${({ height }) => (height && height[2] === 'break' ? 'auto' : '')};;
    
    ${RatioContainer} {
      position: ${({ height }) => (height && height[2] === 'break' ? 'relative' : 'absolute')};;
    }
  `)};
`;

const RatioBox = props => (
  <RatioWrapper {...props}>
    <RatioContainer>
      {props.children}
    </RatioContainer>
  </RatioWrapper>
);

export default RatioBox;

export { RatioContainer, RatioWrapper };
