import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Menu, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

import { useUserContext } from 'components/UserContext';
import { useProgressiveContext } from 'components/ProgressiveContext';
import { ScreenType, UserRole } from 'utils/enums';

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

  @media only screen and (max-width: 350px) {
    font-size: 12px;
  }
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
  const { isLoggedIn, logout, user } = useUserContext();

  return (
    <MenuRow>
      <MenuAppGroup>
        <Menu.Item>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.SubMenu title="About">
          <Menu.Item>
            <Link to="/about/othello">Othello</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/about/wof">World Othello Federation</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/about/oos">Othello Organisation Singapore</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/about/othellostorm">Othello Storm System</Link>
          </Menu.Item>
        </Menu.SubMenu>
        {isLoggedIn ? (
          <Menu.SubMenu title="Tournament">
            <Menu.Item>
              <Link to="/tournaments/managed">Managed by Me</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/tournaments/created">Created by Me</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/tournaments/all">All Tournaments</Link>
            </Menu.Item>
          </Menu.SubMenu>
        ) : (
          <Menu.Item>
            <Link to="/tournaments/all">Tournament</Link>
          </Menu.Item>
        )}
        <Menu.SubMenu title="Resources">
          <Menu.Item>
            <Link to="/resources/platform">Othello Platforms</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/resources/book">Othello Books</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/resources/video">Othello Teaching Videos</Link>
          </Menu.Item>
        </Menu.SubMenu>
      </MenuAppGroup>

      <MenuProfileGroup>
        {isLoggedIn ? (
          <>
            {user.role === UserRole.Superuser ? (
              <Menu.SubMenu title="Profile">
                <Menu.Item>
                  <Link to="/profile">Profile</Link>
                </Menu.Item>
                <Menu.Item>
                  <Link to="/superuser">Superuser Panel</Link>
                </Menu.Item>
              </Menu.SubMenu>
            ) : (
              <Menu.Item>
                <Link to="/profile">Profile</Link>
              </Menu.Item>
            )}
            <StyledButton type="primary" danger onClick={() => logout()}>
              Logout
            </StyledButton>
          </>
        ) : (
          <Button type="primary">
            <Link to="/login">Login</Link>
          </Button>
        )}
      </MenuProfileGroup>
    </MenuRow>
  );
}

function MobileMenu() {
  const { isLoggedIn, logout, user } = useUserContext();

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
          <Menu.SubMenu title="About">
            <Menu.Item>
              <Link to="/about/othello">Othello</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/about/wof">WOF</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/about/oos">OOS</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/about/othellostorm">Othello Storm</Link>
            </Menu.Item>
          </Menu.SubMenu>
          {isLoggedIn ? (
            <Menu.SubMenu title="Tournament">
              <Menu.Item>
                <Link to="/tournaments/managed">Managed by Me</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/tournaments/created">Created by Me</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/tournaments/all">All Tournaments</Link>
              </Menu.Item>
            </Menu.SubMenu>
          ) : (
            <Menu.Item>
              <Link to="/tournaments/all">Tournament</Link>
            </Menu.Item>
          )}
          <Menu.SubMenu title="Resources">
            <Menu.Item>
              <Link to="/resources/platform">Platforms</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/resources/book">Books</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/resources/video">Teaching Videos</Link>
            </Menu.Item>
          </Menu.SubMenu>
          {isLoggedIn && (
            <>
              {user.role === UserRole.Superuser ? (
                <Menu.SubMenu title="Profile">
                  <Menu.Item>
                    <Link to="/profile">Profile</Link>
                  </Menu.Item>
                  <Menu.Item>
                    <Link to="/superuser">Superuser Panel</Link>
                  </Menu.Item>
                </Menu.SubMenu>
              ) : (
                <Menu.Item>
                  <Link to="/profile">Profile</Link>
                </Menu.Item>
              )}
            </>
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
