import styled from 'styled-components';

import { Form } from 'antd';

export const FormItem = styled(Form.Item)`
  align-items: center;
  margin-bottom: 12px;

  & > :first-child {
    flex-basis: 150px;
    display: flex;
    justify-content: flex-start;
  }
`;
