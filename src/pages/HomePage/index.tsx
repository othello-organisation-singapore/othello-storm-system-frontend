import React from 'react';
import styled from 'styled-components';

import { Typography } from 'antd';
const { Title } = Typography;

import Othello from 'images/Othello.jpeg';
import Storm from 'images/Storm.jpeg';
import Trophy from 'images/Trophy.jpeg';
import { HomePageInfoCard } from './parts';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const StyledTitle = styled(Title)`
  && {
    margin-top: 20px;
    margin-bottom: 5px;
  }
`;

const StyledSubtitle = styled(Title).attrs({ level: 5 })`
  && {
    margin-bottom: 60px;
    color: rgb(180, 180, 180);
  }
`;

const CardsWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  width: 100%;
`;

function HomePage() {
  return (
    <PageWrapper>
      <StyledTitle>Welcome to Othello Storm System!</StyledTitle>
      <StyledSubtitle>
        The modern way to manage Othello tournaments.
      </StyledSubtitle>
      <CardsWrapper>
        <HomePageInfoCard
          link="/about/othello"
          title="About Othello"
          imgSrc={Othello}
        >
          What is Othello?
          <br />
          How do I get started in Othello?
          <br />
          How do I join Othello community?
        </HomePageInfoCard>
        <HomePageInfoCard
          link="/about/oss"
          title="About Othello Storm"
          imgSrc={Storm}
        >
          Why Othello Storm need to exist?
          <br />
          What features are available?
          <br />
          How do I use Othello Storm?
        </HomePageInfoCard>
        <HomePageInfoCard
          link="/tournaments"
          title="Check Tournament Lists"
          imgSrc={Trophy}
        >
          Check all the tournaments that has been created in Othello Storm!
        </HomePageInfoCard>
      </CardsWrapper>
    </PageWrapper>
  );
}

export default HomePage;
