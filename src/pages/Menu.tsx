import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Dropdown, Menu, Button } from 'semantic-ui-react';

import { useUserContext } from 'UserContext';

const StyledMenu = styled(Menu)`
  && {
    justify-content: space-between;
    border-radius: 0;
  }
`;

const MenuAppGroup = styled.div`
  display: flex;
  flex-grow: 1;
`;

const MenuProfileGroup = styled.div`
  display: flex;
  align-items: center;
`;

function OSSMenu() {
  const { isLoggedIn } = useUserContext();

  return (
    <StyledMenu inverted>
      <MenuAppGroup>
        <Menu.Item name="Home" as={Link} to="/" />
        <Menu.Item name="About" as={Link} to="/about" />
        <Menu.Item name="Tournament" as={Link} to="/tournament" />
      </MenuAppGroup>
      <MenuProfileGroup>
        {isLoggedIn ? (
          <>
            <Menu.Item name="Profile" as={Link} to="/profile" />
            <Button color="red">Logout</Button>
          </>
        ) : (
          <Button primary as={Link} to="/login">
            Login
          </Button>
        )}
      </MenuProfileGroup>
    </StyledMenu>
  );
}

export default OSSMenu;
