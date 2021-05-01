import styled from 'styled-components';

import { Typography } from 'antd';
const { Title } = Typography;

export const PageTitle = styled(Title).attrs({ level: 2 })`
  && {
    margin-bottom: 30px;
  }
`;
