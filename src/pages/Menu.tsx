import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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

const MenuRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledButton = styled(Button)`
  margin-left: 10px;
`;

function OSSMenu() {
  const { isLoggedIn, logout } = useUserContext();

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
            <StyledButton type="primary" danger onClick={() => logout()}>
              Logout
            </StyledButton>
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
