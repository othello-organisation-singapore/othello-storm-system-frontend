import React, { useState } from 'react';
import styled from 'styled-components';

import { Typography, Input, Button } from 'antd';

import { useUserContext } from '../UserContext';

const { Title, Text } = Typography;

const StyledTitle = styled(Title)`
  && {
    margin-bottom: 20px;
  }
`;

const StyledInput = styled(Input)`
  margin: 10px 0;
  max-width: 300px;
`;

const StyledPasswordInput = styled(Input.Password)`
  margin: 10px 0 20px;
  max-width: 300px;
`;

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { login } = useUserContext();

  return (
    <>
      <StyledTitle level={2}>Login</StyledTitle>
      <div>
        <Text>Username</Text>
      </div>
      <div>
        <StyledInput
          placeholder="Your username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      </div>
      <div>
        <Text>Password</Text>
      </div>
      <div>
        <StyledPasswordInput
          placeholder="Your password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <Button type="primary" onClick={() => login(username, password)}>
        Login
      </Button>
    </>
  );
}

export default LoginPage;
