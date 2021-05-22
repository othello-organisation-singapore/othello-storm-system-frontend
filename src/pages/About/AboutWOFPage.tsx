import React from 'react';

import {
  ExternalLink,
  InfoBlock,
  PageTitle,
  CaptionedImage,
  CaptionedImageGroup,
  PageWrapper,
} from 'components/common';
import WOC2019TournamentRoom from 'images/WOC2019TournamentRoom.jpeg';
import WOC2019Final from 'images/WOC2019Final.jpeg';
import WOC2019Winners from 'images/WOC2019Winners.jpeg';
import WOC2019Champ from 'images/WOC2019Champ.jpeg';
import WOC2019FemaleChamp from 'images/WOC2019FemaleChamp.jpeg';

function AboutWOFPage() {
  return (
    <PageWrapper>
      <PageTitle>About World Othello Federation (WOF)</PageTitle>
      <InfoBlock title="What is WOF?">
        WOF (World Othello Federation) is the official organisation that
        comprises of multiple countries worldwide, which aim to promote the game
        of Othello. <br />
        More details can be found in their official website{' '}
        <ExternalLink to="https://www.worldothello.org/">here</ExternalLink>.
      </InfoBlock>
      <InfoBlock title="Is there an Othello organisation in my country?">
        The list of official national Othello organisation under WOF and the PIC
        for each country can be found{' '}
        <ExternalLink to="https://www.worldothello.org/associations">
          here
        </ExternalLink>
        .
      </InfoBlock>
      <InfoBlock title="Is there official tournaments for Othello?">
        Yes, WOF organised international tournament annually (except for 2020
        and 2021, because of COVID T_T), which is called{' '}
        <ExternalLink to="https://www.worldothello.org/about/tournaments/world-othello-championship">
          World Othello Championship (WOC)
        </ExternalLink>
        . <br />
        Usually, each countries also has their own official tournaments for WOC
        selection. <br />
        Please contact your country PIC to get a more specific details for the
        tournaments in your country.
      </InfoBlock>
      <InfoBlock title="Is there official rating or title in Othello?">
        Othello's official rating can be accessed in{' '}
        <ExternalLink to="https://www.worldothello.org/ratings">
          here
        </ExternalLink>
        . However, there are no title (Grandmaster, etc) in Othello for now.
      </InfoBlock>
      <CaptionedImageGroup>
        <CaptionedImage src={WOC2019TournamentRoom}>
          One of WOC 2019 Tournament match.
        </CaptionedImage>
        <CaptionedImage src={WOC2019Final}>
          WOC 2019 final match.
        </CaptionedImage>
        <CaptionedImage src={WOC2019Winners}>
          Winners of WOC 2019.
        </CaptionedImage>
        <CaptionedImage src={WOC2019FemaleChamp}>
          Joanna William, WOC 2019 Female Champion
        </CaptionedImage>
        <CaptionedImage src={WOC2019Champ}>
          Akihiro Takahashi (center), WOC 2019 Champion
        </CaptionedImage>
      </CaptionedImageGroup>
    </PageWrapper>
  );
}

export default AboutWOFPage;
