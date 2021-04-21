import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Menu, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

import { ScreenType } from 'enums';
import { useUserContext } from 'UserContext';
import { useProgressiveContext } from 'ProgressiveContext';

const MenuRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledMenuGroup = styled(Menu).attrs({
  mode: 'horizontal',
  theme: 'dark',
  selectedKeys: [],
})`
  padding: 0 30px 0 10px;
`;

const MenuAppGroup = styled(StyledMenuGroup)`
  flex-grow: 1;
  display: flex;
  align-items: center;
`;

const MenuProfileGroup = styled(StyledMenuGroup)``;

const StyledButton = styled(Button)`
  margin-left: 10px;
`;

const HamburgerMenuWrapper = styled.div`
  height: 30px;
  width: 30px;
  border: 1px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function OSSMenu() {
  const { screenType } = useProgressiveContext();

  return screenType === ScreenType.Desktop ? <DesktopMenu /> : <MobileMenu />;
}

function DesktopMenu() {
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

function MobileMenu() {
  const { isLoggedIn, logout } = useUserContext();

  return (
    <MenuRow>
      <MenuAppGroup>
        <Menu.SubMenu
          title={
            <HamburgerMenuWrapper>
              <MenuOutlined style={{ marginRight: 0 }} />
            </HamburgerMenuWrapper>
          }
        >
          <Menu.Item>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/about">About</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/tournament">Tournament</Link>
          </Menu.Item>
          {isLoggedIn && (
            <Menu.Item>
              <Link to="/profile">Profile</Link>
            </Menu.Item>
          )}
        </Menu.SubMenu>
      </MenuAppGroup>
      <MenuProfileGroup>
        {isLoggedIn ? (
          <Button type="primary" danger onClick={() => logout()}>
            Logout
          </Button>
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
