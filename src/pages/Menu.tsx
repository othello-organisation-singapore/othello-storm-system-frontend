import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Dropdown } from 'semantic-ui-react';
import { Menu, Button } from 'antd';

import { useUserContext } from 'UserContext';

const StyledMenuGroup = styled(Menu).attrs({
  mode: 'horizontal',
  theme: 'dark',
  selectedKeys: [],
})`
  padding: 0 30px 0 10px;
`;

const MenuAppGroup = styled(StyledMenuGroup)`
  flex-grow: 1;
`;

const MenuProfileGroup = styled(StyledMenuGroup)``;

const Gap = styled.div`
  flex-grow: 1;
`;

const MenuRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

function OSSMenu() {
  const { isLoggedIn } = useUserContext();

  return (
    <MenuRow>
      <MenuAppGroup>
        <Menu.Item>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/about">About</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/tournament">Tournament</Link>
        </Menu.Item>
      </MenuAppGroup>
      <MenuProfileGroup>
        {isLoggedIn ? (
          <>
            <Menu.Item>
              <Link to="/profile">Profile</Link>
            </Menu.Item>
            <Button type="primary" danger>
              Logout
            </Button>
          </>
        ) : (
          <Button type="primary">
            <Link to="login">Login</Link>
          </Button>
        )}
      </MenuProfileGroup>
    </MenuRow>
  );
}

export default OSSMenu;
