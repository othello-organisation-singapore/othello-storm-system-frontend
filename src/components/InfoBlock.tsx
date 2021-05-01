import React, { ReactNode } from 'react';
import styled from 'styled-components';

import InfoCard from 'components/InfoCard';

const InfoCardWrapper = styled.div`
  padding-bottom: 10px;
`;

const StyledInfoCard = styled(InfoCard)`
  margin-bottom: 30px;
`;

interface InfoBlockProps {
  title: ReactNode;
  children: ReactNode;
}

export default function InfoBlock({ title, children }: InfoBlockProps) {
  return (
    <InfoCardWrapper>
      <StyledInfoCard title={title}>{children}</StyledInfoCard>
    </InfoCardWrapper>
  );
}
