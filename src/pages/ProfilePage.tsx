import React, { useState } from 'react';
import styled from 'styled-components';

import { Form, Input, Button, Collapse, Typography } from 'antd';
const { Text } = Typography;
const { Panel } = Collapse;

import { PageTitle, FormLabel, Row } from 'components/common';
import { useUserContext } from 'components/UserContext';
import useFetch from 'hooks/useFetch';
import useToastPushSubmit from 'hooks/useToastPushSubmit';
import { MessageResponse } from 'utils/apiResponseShape';

const ProfilePageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledForm = styled(Form)`
  width: 100%;
`;

const StyledFormItem = styled(Form.Item)`
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 12px;

  @media only screen and (min-width: 550px) {
    width: 500px;
  }

  & > :first-child {
    flex-basis: 150px;
    display: flex;
    justify-content: flex-start;
  }
`;

const StyledCollapse = styled(Collapse)`
  margin-left: auto;
  margin-right: auto;

  @media only screen and (min-width: 550px) {
    width: 500px;
  }

  @media only screen and (max-width: 575px) {
    margin-left: -16px;
  }

  @media only screen and (min-width: 576px) {
    & > * {
      margin-left: -16px;
    }
  }
`;

const StyledPasswordInput = styled(Input.Password)`
  width: 300px;
`;

const StyledRow = styled(Row)`
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;

  @media only screen and (min-width: 550px) {
    width: 500px;
  }
`;

function ProfilePage() {
  const { user, updateCurrentUser } = useUserContext();
  const { displayName: userDisplayName } = user;

  const [displayName, setDisplayName] = useState(userDisplayName);
  const [newPassword1, setNewPassword1] = useState('');
  const [newPassword2, setNewPassword2] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const { pushError, pushSuccess } = useToastPushSubmit();
  const { request, isLoading } = useFetch<MessageResponse>();

  const handleSubmit = async () => {
    if (newPassword1 !== newPassword2) {
      setPasswordError(true);
      return;
    }
    setPasswordError(false);

    const patchBody =
      newPassword1 === ''
        ? { displayName }
        : { displayName, password: newPassword1 };

    const { response, error } = await request(
      `/api/users/${user.username}/`,
      'PATCH',
      patchBody
    );

    if (response === '') {
      pushError(error.code);
    } else {
      pushSuccess('User updated');
      await updateCurrentUser();
      setNewPassword1('');
      setNewPassword2('');
    }
  };

  return (
    <ProfilePageWrapper>
      <PageTitle>Profile</PageTitle>
      <StyledForm>
        <StyledFormItem label={<FormLabel>Username</FormLabel>}>
          <Text>{user.username}</Text>
        </StyledFormItem>
        <StyledFormItem label={<FormLabel>Display Name</FormLabel>}>
          <Text editable={{ onChange: setDisplayName }}>{displayName}</Text>
        </StyledFormItem>
        <StyledFormItem label={<FormLabel>Role</FormLabel>}>
          <Text>{user.role}</Text>
        </StyledFormItem>
        <StyledCollapse ghost>
          <Panel key={1} header="Change password">
            <StyledFormItem
              label={<FormLabel>New Password</FormLabel>}
              validateStatus={passwordError ? 'error' : 'validating'}
              help={passwordError ? 'Mismatched password' : null}
              key="1"
            >
              <StyledPasswordInput
                placeholder="New password"
                value={newPassword1}
                onChange={e => setNewPassword1(e.target.value)}
              />
            </StyledFormItem>
            <StyledFormItem
              label={<FormLabel>Confirm Password</FormLabel>}
              validateStatus={passwordError ? 'error' : 'validating'}
              help={passwordError ? 'Mismatched password' : null}
              key="2"
            >
              <StyledPasswordInput
                placeholder="Confirm password"
                value={newPassword2}
                onChange={e => setNewPassword2(e.target.value)}
              />
            </StyledFormItem>
          </Panel>
        </StyledCollapse>
        <StyledRow>
          <Button
            type="primary"
            onClick={() => handleSubmit()}
            disabled={isLoading}
          >
            Save Changes
          </Button>
        </StyledRow>
      </StyledForm>
    </ProfilePageWrapper>
  );
}

export default ProfilePage;
