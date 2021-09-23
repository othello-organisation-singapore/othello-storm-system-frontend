import React from 'react';
import { Link } from 'react-router-dom';

import {
  ExternalLink,
  InfoBlock,
  PageTitle,
  CaptionedImage,
  CaptionedImageGroup,
  PageWrapper,
} from 'components/common';
import OthelloMatch from 'images/OthelloMatch.jpeg';
import OthelloSet from 'images/OthelloSet.jpeg';
import OthelloSetup from 'images/OthelloSetup.jpeg';

function AboutOthelloPage() {
  return (
    <PageWrapper>
      <PageTitle>About Othello</PageTitle>
      <InfoBlock title="What is Othello?">
        Othello is a competitive mind sport that is played using an 8 x 8 board
        and set of distinct double sided discs for each side (typically light
        and dark color on different sides of the discs), where each side
        belonging to one player. <br />
        The players' aim is to have their disc side dominated the board at the
        end of the game.
      </InfoBlock>
      <InfoBlock title="What are the rules of Othello?">
        Please check the official rules of Othello{' '}
        <ExternalLink to="https://www.worldothello.org/about/about-othello/othello-rules/official-rules/english">
          here
        </ExternalLink>
        .
      </InfoBlock>
      <InfoBlock title="How do I start to play Othello?">
        Either you can join Othello community around you (Check{' '}
        <Link to="/about/wof">here</Link> for details on official communities),
        or feel free to join online communities, as mentioned{' '}
        <Link to="/resources/platform">here</Link>.
      </InfoBlock>
      <CaptionedImageGroup>
        <CaptionedImage src={OthelloSet}>
          A typical official tournament Othello Set.
        </CaptionedImage>
        <CaptionedImage src={OthelloSetup}>
          Starting condition of an Othello board before a match.
        </CaptionedImage>
        <CaptionedImage src={OthelloMatch}>
          An official tournament of Othello. (Photo by Chin)
        </CaptionedImage>
      </CaptionedImageGroup>
    </PageWrapper>
  );
}

export default AboutOthelloPage;
