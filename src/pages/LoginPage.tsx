import React, { useState } from 'react';
import styled from 'styled-components';

import { Typography, Input, Button } from 'antd';

import { PageTitle, FormLabel } from 'components/common';
import { useUserContext } from 'components/UserContext';

const { Text } = Typography;

const LoginPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledInput = styled(Input)`
  margin: 10px 0;
  width: 300px;
`;

const StyledPasswordInput = styled(Input.Password)`
  margin: 10px 0 20px;
  width: 300px;
`;

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { login, isLoading } = useUserContext();

  return (
    <LoginPageWrapper>
      <PageTitle>Login</PageTitle>
      <div>
        <div>
          <FormLabel>Username</FormLabel>
        </div>
        <div>
          <StyledInput
            placeholder="Your username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div>
          <FormLabel>Password</FormLabel>
        </div>
        <div>
          <StyledPasswordInput
            placeholder="Your password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <Button
          type="primary"
          onClick={() => login(username, password)}
          disabled={isLoading}
        >
          Login
        </Button>
      </div>
    </LoginPageWrapper>
  );
}

export default LoginPage;
