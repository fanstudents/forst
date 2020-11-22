import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { GridWrapper } from 'components/share/Grid';

const FooterWrapper = styled.div``;

const Footer = ({ className }) => (
  <FooterWrapper className={className}>
    <GridWrapper />
  </FooterWrapper>
);

export default Footer;

Footer.propTypes = {
  className: PropTypes.string,
};

Footer.defaultProps = {
  className: '',
};