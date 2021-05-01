import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Typography } from 'antd';
const { Title, Text } = Typography;

import InfoCard from 'components/InfoCard';

const StyledCard = styled(InfoCard)`
  width: 300px;
  height: 400px;
  margin: 20px 0;

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
