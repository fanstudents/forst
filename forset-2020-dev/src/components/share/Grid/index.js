/**
 * styled-components Grid@0.1.0 by sorosora
 */

import styled, { css } from 'styled-components';
import withViewport from 'utils/withViewport';

const wrapperGridWidth = '1200px';
const fullWidth = '100vw';
const gridGutter = '32px';
const wrapperPadding = '16px';

const isNaN = (value) => {
  const n = Number(value);
  const nSelf = n;
  return nSelf !== n;
};

const getHalfMeasure = (measure) => {
  if (!measure) {
    return '';
  }
  const match = measure.match(/^([+-]?(?:\d+|\d*\.\d+))([a-z]*|%)$/);
  if (!match) {
    return '';
  }
  return Number(match[1]) === 0 ? '0' : `${match[1] / 2}${match[2]}`;
};

const percentage = (value) => {
  if (isNaN(value)) {
    return '';
  }
  return `${value * 100}%`;
};

const fullWidthWrapperStyle = css`
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: ${({ viewport }) => (viewport.isIE ? `-${viewport.width / 2}px` : getHalfMeasure(`-${fullWidth}`))};
  margin-right: ${({ viewport }) => (viewport.isIE ? `-${viewport.width / 2}px` : getHalfMeasure(`${fullWidth}`))};
  width: ${({ viewport }) => (viewport.isIE ? `${viewport.width}px` : fullWidth)};
`;

const fullWidthReset = css`
  left: auto;
  right: auto;
  margin-left: 0;
  margin-right: 0;
  width: 100%;
`;

const checkReset = (desktop, tablet, phone) => {
  if (typeof tablet === 'undefined' && typeof phone === 'undefined') {
    return '';
  }
  if (typeof phone === 'undefined') {
    return !desktop && tablet ? fullWidthReset : '';
  }
  return (!desktop || !tablet) && phone ? fullWidthReset : '';
};

const checkFull = (desktop, tablet, phone) => {
  if (typeof tablet === 'undefined' && typeof phone === 'undefined') {
    return '';
  }
  if (typeof phone === 'undefined') {
    return desktop && !tablet ? fullWidthWrapperStyle : '';
  }
  return (desktop || tablet) && !phone ? fullWidthWrapperStyle : '';
};

const FullWidthWrapper = withViewport(styled.div`
  ${({ disabled: [desktop = false] = [] }) => (desktop ? '' : fullWidthWrapperStyle)};
  
  ${({ theme }) => theme.media.tablet(css`
    ${({ disabled: [desktop = false, tablet] = [] }) => checkReset(desktop, tablet)};
    ${({ disabled: [desktop = false, tablet] = [] }) => checkFull(desktop, tablet)};
  `)};
  
  ${({ theme }) => theme.media.phone(css`
    ${({ disabled: [desktop = false, tablet, phone] = [] }) => checkReset(desktop, tablet, phone)};
    ${({ disabled: [desktop = false, tablet, phone] = [] }) => checkFull(desktop, tablet, phone)};
  `)};
`);

const Col = styled.div`
  display: ${({ width: [desktop] = [] }) => (desktop === 0 ? 'none' : 'block')};
  flex: 1 1;
  flex-basis: ${({ width: [desktop] = [] }) => percentage(desktop)};
  margin-left: ${({ offset: [desktop] = [] }) => percentage(desktop)};
  //in order to fix float overflow when margin-left is negative
  margin-right: ${({ offset: [desktop] = [] }) => (desktop < 0 ? percentage(desktop) : '')};
  max-width: ${({ width: [desktop] = [] }) => percentage(desktop)};
  font-size: 0;
  
  ${({ theme }) => theme.media.tablet(css`
    display: ${({ width: [, tablet] = [] }) => (tablet === 0 ? 'none' : 'block')};
    flex-basis: ${({ width: [, tablet] = [] }) => percentage(tablet)};
    margin-left: ${({ offset: [, tablet] = [] }) => percentage(tablet)};
    margin-right: ${({ offset: [, tablet] = [] }) => (tablet < 0 ? percentage(tablet) : '')};
    max-width: ${({ width: [, tablet] = [] }) => percentage(tablet)};
  `)};
  
  ${({ theme }) => theme.media.phone(css`
    display: ${({ width: [, , phone] = [] }) => (phone === 0 ? 'none' : 'block')};
    flex-basis: ${({ width: [, , phone] = [] }) => percentage(phone)};
    margin-left: ${({ offset: [, , phone] = [] }) => percentage(phone)};
    margin-right: ${({ offset: [, , phone] = [] }) => (phone < 0 ? percentage(phone) : '')};
    max-width: ${({ width: [, , phone] = [] }) => percentage(phone)};
  `)};
`;

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: ${({ 'vertical-gutter': [desktop = ''] = [] }) => getHalfMeasure(`-${desktop}`)};
  margin-bottom: ${({ 'vertical-gutter': [desktop = ''] = [] }) => getHalfMeasure(`-${desktop}`)};
  margin-left: ${({ gutter: [desktop = gridGutter] = [] }) => getHalfMeasure(`-${desktop}`)};
  margin-right: ${({ gutter: [desktop = gridGutter] = [] }) => getHalfMeasure(`-${desktop}`)};
  
  ${({ gutter: [gutter = gridGutter] = [], 'vertical-gutter': [verticalGutter = ''] = [], 'show-grid': showGrid }) => (showGrid ? css`
    position: relative;
    
    &:after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin-top: ${getHalfMeasure(verticalGutter)};
      margin-bottom: ${getHalfMeasure(verticalGutter)};
      background: repeating-linear-gradient(
        90deg,
        rgba(255,255,255,0),
        rgba(255,255,255,0) 0,
        rgba(255,255,255,0) ${getHalfMeasure(gutter)},
        rgba(255,100,20,0.3) 0,
        rgba(255,100,20,0.3) calc(${(1 / showGrid) * 100}% - ${getHalfMeasure(gutter)}),
        rgba(255,255,255,0) 0,
        rgba(255,255,255,0) ${(1 / showGrid) * 100}%
      );
      pointer-events: none;
    }
  ` : '')}
  
  ${Col} {
    padding-top: ${({ 'vertical-gutter': [desktop = ''] = [] }) => getHalfMeasure(desktop)};
    padding-bottom: ${({ 'vertical-gutter': [desktop = ''] = [] }) => getHalfMeasure(desktop)};
    padding-left: ${({ gutter: [desktop = gridGutter] = [] }) => getHalfMeasure(desktop)};
    padding-right: ${({ gutter: [desktop = gridGutter] = [] }) => getHalfMeasure(desktop)};
  }
  
  ${({ theme }) => theme.media.tablet(css`
    margin-top: ${({ 'vertical-gutter': [, tablet = ''] = [] }) => getHalfMeasure(`-${tablet}`)};
    margin-bottom: ${({ 'vertical-gutter': [, tablet = ''] = [] }) => getHalfMeasure(`-${tablet}`)};
    margin-left: ${({ gutter: [, tablet = ''] = [] }) => getHalfMeasure(`-${tablet}`)};
    margin-right: ${({ gutter: [, tablet = ''] = [] }) => getHalfMeasure(`-${tablet}`)};
    
    ${({ gutter: [, gutter = ''] = [], 'vertical-gutter': [, verticalGutter = ''] = [], 'show-grid': showGrid }) => (showGrid ? css`
      &:after {
        margin-top: ${getHalfMeasure(verticalGutter)};
        margin-bottom: ${getHalfMeasure(verticalGutter)};
        background: repeating-linear-gradient(
          90deg,
          rgba(255,255,255,0),
          rgba(255,255,255,0) 0,
          rgba(255,255,255,0) ${getHalfMeasure(gutter)},
          rgba(255,100,20,0.3) 0,
          rgba(255,100,20,0.3) calc(${(1 / showGrid) * 100}% - ${getHalfMeasure(gutter)}),
          rgba(255,255,255,0) 0,
          rgba(255,255,255,0) ${(1 / showGrid) * 100}%
        );
      }
   ` : '')}
    
    ${Col} {
      padding-top: ${({ 'vertical-gutter': [, tablet = ''] = [] }) => getHalfMeasure(tablet)};
      padding-bottom: ${({ 'vertical-gutter': [, tablet = ''] = [] }) => getHalfMeasure(tablet)};
      padding-left: ${({ gutter: [, tablet = ''] = [] }) => getHalfMeasure(tablet)};
      padding-right: ${({ gutter: [, tablet = ''] = [] }) => getHalfMeasure(tablet)};
    }
  `)};
  
  ${({ theme }) => theme.media.phone(css`
    margin-top: ${({ 'vertical-gutter': [, , phone = ''] = [] }) => getHalfMeasure(`-${phone}`)};
    margin-bottom: ${({ 'vertical-gutter': [, , phone = ''] = [] }) => getHalfMeasure(`-${phone}`)};
    margin-left: ${({ gutter: [, , phone = ''] = [] }) => getHalfMeasure(`-${phone}`)};
    margin-right: ${({ gutter: [, , phone = ''] = [] }) => getHalfMeasure(`-${phone}`)};
    
    ${({ gutter: [, , gutter = ''] = [], 'vertical-gutter': [, , verticalGutter = ''] = [], 'show-grid': showGrid }) => (showGrid ? css`
      &:after {
        margin-top: ${getHalfMeasure(verticalGutter)};
        margin-bottom: ${getHalfMeasure(verticalGutter)};
        background: repeating-linear-gradient(
          90deg,
          rgba(255,255,255,0),
          rgba(255,255,255,0) 0,
          rgba(255,255,255,0) ${getHalfMeasure(gutter)},
          rgba(255,100,20,0.3) 0,
          rgba(255,100,20,0.3) calc(${(1 / showGrid) * 100}% - ${getHalfMeasure(gutter)}),
          rgba(255,255,255,0) 0,
          rgba(255,255,255,0) ${(1 / showGrid) * 100}%
        );
      }
    ` : '')}
    
    ${Col} {
      padding-top: ${({ 'vertical-gutter': [, , phone = ''] = [] }) => getHalfMeasure(phone)};
      padding-bottom: ${({ 'vertical-gutter': [, , phone = ''] = [] }) => getHalfMeasure(phone)};
      padding-left: ${({ gutter: [, , phone = ''] = [] }) => getHalfMeasure(phone)};
      padding-right: ${({ gutter: [, , phone = ''] = [] }) => getHalfMeasure(phone)};
    }
  `)};
`;

const GridWrapper = styled.div`
  position: relative;
  margin-left: auto;
  margin-right: auto;
  padding-left: ${({ padding: [desktop = wrapperPadding] = [] }) => desktop};
  padding-right: ${({ padding: [desktop = wrapperPadding] = [] }) => desktop};
  max-width: ${({ gridWidth: [desktop = wrapperGridWidth] = [] }) => desktop};
  width: 100%; // set width small than max-width
  
  ${({ theme }) => theme.media.tablet(css`
    padding-left: ${({ padding: [, tablet = ''] = [] }) => tablet}; 
    padding-right: ${({ padding: [, tablet = ''] = [] }) => tablet};
    max-width: ${({ gridWidth: [, tablet = ''] = [] }) => tablet};
  `)};
  
  ${({ theme }) => theme.media.phone(css`
    padding-left: ${({ padding: [, , phone = ''] = [] }) => phone};
    padding-right: ${({ padding: [, , phone = ''] = [] }) => phone};
    max-width: ${({ gridWidth: [, , phone = ''] = [] }) => phone};
  `)};
`;

export { FullWidthWrapper, GridWrapper, Grid, Col };
