import React, { useState } from 'react';
import styled from 'styled-components';

import { Input, Button, Form } from 'antd';

import {
  GroupTitle,
  FormLabel,
  FormItem,
  StyledInput,
} from 'components/common';
import useToastPushSubmit from 'hooks/useToastPushSubmit';
import useFetch from 'hooks/useFetch';
import { MessageResponse } from 'utils/apiResponseShapes';
import { HttpErrorCodes } from 'utils/enums';

const StyledPasswordInput = styled(Input.Password)`
  margin: 10px 0 20px;
  width: 300px;
`;

function CreateAdminPanel() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [formError, setFormError] = useState(false);

  const { pushError, pushSuccess } = useToastPushSubmit({
    [HttpErrorCodes.BadRequestError]: 'Username exists',
  });
  const { request, isLoading } = useFetch<MessageResponse>();
  const handleSubmit = async () => {
    if (username === '' || password === '' || displayName === '') {
      setFormError(true);
      return;
    }
    setFormError(false);

    const { response, error } = await request(`/api/users/`, 'POST', {
      username,
      password,
      displayName,
    });

    if (response === '') {
      pushError(error.code);
    } else {
      pushSuccess('User created');
      setUsername('');
      setPassword('');
      setDisplayName('');
    }
  };

  return (
    <div>
      <GroupTitle>Create New Admin</GroupTitle>
      <Form>
        <FormItem
          label={<FormLabel>Username</FormLabel>}
          validateStatus={formError && username === '' ? 'error' : 'validating'}
          help={formError && username === '' ? 'Cannot be empty' : null}
        >
          <StyledInput
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </FormItem>
        <FormItem
          label={<FormLabel>Display Name</FormLabel>}
          validateStatus={
            formError && displayName === '' ? 'error' : 'validating'
          }
          help={formError && displayName === '' ? 'Cannot be empty' : null}
        >
          <StyledInput
            placeholder="Display name"
            value={displayName}
            onChange={e => setDisplayName(e.target.value)}
          />
        </FormItem>
        <FormItem
          label={<FormLabel>Password</FormLabel>}
          validateStatus={formError && password === '' ? 'error' : 'validating'}
          help={formError && password === '' ? 'Cannot be empty' : null}
        >
          <StyledPasswordInput
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </FormItem>

        <Button type="primary" disabled={isLoading} onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default CreateAdminPanel;
