/**
 * styled-components ExpandableBlock@0.0.10 by sorosora
 */

import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const defaultMaxHeight = '9999px';

const maxHeightCondition = (props, size) => {
  if (props.enable && props.enable[size] !== undefined) {
    if (props.enable[size]) {
      if (props.active) {
        if (props.maxHeight && props.maxHeight[size]) {
          return props.maxHeight[size];
        }
        return defaultMaxHeight;
      }
      return 0;
    }
    return '100%';
  }
  return '';
};

const ExpandableWrapper = styled.div`
  overflow: hidden;
  transition: all .5s;
  transition-timing-function: ${({ active }) => (active ? 'cubic-bezier(0.71, 0.01, 1, 0.32)' : 'cubic-bezier(.075,.82,.165,1)')};
  
  max-height: ${props => maxHeightCondition(props, 0)};
  
  ${({ theme }) => theme.media.tablet(css`
    max-height: ${props => maxHeightCondition(props, 1)};
  `)};
    
  ${({ theme }) => theme.media.phone(css`
    max-height: ${props => maxHeightCondition(props, 2)};
  `)};
`;

const ClickableWrapper = styled.div``;

const ExpandableBlockWrapper = styled.div``;

export default class ExpandableBlock extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      active: false,
    };
  }
  handleClick() {
    this.setState(prevState => ({ active: !prevState.active }));
  }
  render() {
    const { children, enable, ...otherProps } = this.props;
    const clickableContent = children[0];
    const expandableContent = children[1];
    return (
      <ExpandableBlockWrapper {...otherProps}>
        <ClickableWrapper onClick={this.handleClick} active={this.state.active}>
          <clickableContent.type {...clickableContent.props} active={this.state.active} />
        </ClickableWrapper>
        <ExpandableWrapper enable={enable} active={this.state.active}>
          <expandableContent.type {...expandableContent.props} active={this.state.active} />
        </ExpandableWrapper>
      </ExpandableBlockWrapper>
    );
  }
}

ExpandableBlock.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  enable: PropTypes.arrayOf(PropTypes.bool).isRequired,
};
