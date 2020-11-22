import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { GridWrapper } from 'components/share/Grid';
import ListItem from './listItem';

const menuList = [
  {
    id: 0,
    title: '為何是木房子',
    tag: 'what',
  },
  {
    id: 1,
    title: '工作寮屋+溫暖家屋',
    tag: 'house',
  },
  {
    id: 2,
    title: '闊葉林介紹',
    tag: 'broadleaf',
  },
  {
    id: 3,
    title: '針葉林介紹',
    tag: 'coniferous',
  },
  {
    id: 4,
    title: '所有樹種林相圖',
    tag: 'allTree',
  },
  {
    id: 5,
    title: '木材研究室',
    tag: 'wood',
  },
  {
    id: 6,
    title: '里山木屋',
    tag: 'chalet',
  },
  {
    id: 7,
    title: '首頁',
    tag: 'index',
  },
];

const MenuText = styled.span`
  transform: ${({ burgerActive }) => !burgerActive ? 'scale(1)' : 'scale(0.5)'};
  ${({ theme }) => theme.text.h1};
  font-weight: bold;
  color: ${({ theme }) => theme.color.dark};
  transition: 0.3s;

  &:before {
    display: flex;
    content: '';
    width: 100%;
    height: 5px;
    background-color: ${({ theme }) => theme.color.dark};
    transition: 0.3s;
  }
`;

const LogoContent = styled.div`
  width: 170px;
  height: 45px;
  background-color: ${({ theme }) => theme.color.paleGrey};
`;

const MenuSection = styled.div`
  display: flex;
  cursor: pointer;

  &:hover {
    ${MenuText} {
      color: ${({ theme }) => theme.color.paleGrey};

      &:before {
        background-color: ${({ theme }) => theme.color.paleGrey};
      }
    }
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  align-content: baseline;
  justify-content: space-between;
  margin: 45px auto;
`;

const HeaderWrapper = styled.div``;

const Header = ({ query })=> {
  const [burgerActive, setBurgerActive] = useState(false);

  return (
    <HeaderWrapper>
      <GridWrapper>
        <HeaderContainer>
          <LogoContent />
          <MenuSection>
            <ListItem query={query} burgerActive={burgerActive} menuList={menuList} />
            <MenuText burgerActive={burgerActive} onClick={() => setBurgerActive(!burgerActive)}>Menu</MenuText>
          </MenuSection>
        </HeaderContainer>
      </GridWrapper>
    </HeaderWrapper>
  );
}

export default Header;