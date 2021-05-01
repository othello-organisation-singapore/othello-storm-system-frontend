import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Card, Typography } from 'antd';
const { Title, Text } = Typography;

const StyledCard = styled(Card)`
  width: 300px;
  height: 400px;
  margin: 20px 0;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;

  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }

  > * {
    padding: 0;
  }
`;

const StyledCardTitle = styled(Title).attrs({ level: 3 })`
  text-align: center;

  && {
    margin-bottom: 10px;
  }
`;

const StyledCardImage = styled.img`
  width: 100%;
  height: 250px;
`;

const StyledCardContent = styled.div`
  padding: 16px;
  text-align: left;
`;

interface HomePageInfoCardProps {
  children: ReactNode;
  link: string;
  title: ReactNode;
  imgSrc?: string;
}

export function HomePageInfoCard({
  children,
  link,
  title,
  imgSrc = '',
}: HomePageInfoCardProps) {
  return (
    <Link to={link}>
      <StyledCard>
        <StyledCardImage src={imgSrc} />
        <StyledCardContent>
          <StyledCardTitle>{title}</StyledCardTitle>
          <Text>{children}</Text>
        </StyledCardContent>
      </StyledCard>
    </Link>
  );
}
