import styled from 'styled-components';

import { Typography } from 'antd';
const { Title, Text } = Typography;

export const PageTitle = styled(Title).attrs({ level: 2 })`
  && {
    margin-bottom: 30px;
  }
`;

export const FormLabel = styled(Text)`
  font-weight: bold;
`;
