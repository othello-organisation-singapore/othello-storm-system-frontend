import styled from 'styled-components';

import { Form, Input, Typography } from 'antd';
const { Text } = Typography;

export const FormItem = styled(Form.Item)`
  align-items: center;
  margin-bottom: 12px;

  & > :first-child {
    flex-basis: 150px;
    display: flex;
    justify-content: flex-start;
  }
`;

export const StyledInput = styled(Input)`
  margin: 10px 0;
  width: 300px;
`;

export const FormText = styled(Text)``;
