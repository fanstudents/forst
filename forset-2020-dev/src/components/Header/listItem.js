import Link from 'next/link';

import styled from 'styled-components';
import PropTypes from 'prop-types';

const MenuItem = styled.div`
  display: flex;
  padding: ${({ isCurrent }) => isCurrent ? '0 18px' : '0' };
  ${({ theme }) => theme.text.h4};
  align-items: center;
  font-weight: bold;
  color: ${({ theme, isCurrent }) => isCurrent ? theme.color.white : theme.color.dark};
  border-radius: 9px;
  background-color: ${({ theme, isCurrent }) => isCurrent ? theme.color.green : '' };
  transition: 0.3s;
`;

const MenuContent = styled.div`
  display: ${({ burgerActive }) => burgerActive ? 'flex' : 'none'};
  justify-content: space-between;
  column-gap: 16px;
`;

const ListItem = ({ burgerActive, menuList, query }) => {
  return (
    <MenuContent burgerActive={burgerActive}>
      {
        menuList.map((list) => (
          <Link
            key={list.id}
            href={{
              pathname: '/',
              query: { tag: list.tag },
            }}
          >
            <MenuItem isCurrent={query.tag === list.tag}>
              {list.title}
            </MenuItem>
          </Link>
        ))
      }
    </MenuContent>
  )
};

export default ListItem;

ListItem.propTypes = {
  menuList: PropTypes.array.isRequired,
  burgerActive: PropTypes.bool.isRequired,
};
