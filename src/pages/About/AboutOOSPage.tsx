import React from 'react';

import {
  ExternalLink,
  InfoBlock,
  PageTitle,
  CaptionedImage,
  CaptionedImageGroup,
  PageWrapper,
} from 'components/common';
import AlexKoh from 'images/AlexKoh.jpeg';
import AlexLastTable from 'images/AlexLastTable.jpeg';
import AlexVsYusuke from 'images/AlexVsYusuke.jpeg';
import MakotoSuekuni from 'images/MakotoSuekuni.jpeg';
import SingaporeMaster2019 from 'images/SingaporeMaster2019.jpeg';
import SingaporeNSpy from 'images/SingaporeNSpy.jpeg';
import SingaporePlayersCoffee from 'images/SingaporePlayersCoffee.jpeg';
import SingaporeVsJapan from 'images/SingaporeVsJapan.jpeg';
import SNOC2018 from 'images/SNOC2018.jpeg';
import SNOC2019 from 'images/SNOC2019.jpeg';

function AboutOOSPage() {
  return (
    <PageWrapper>
      <PageTitle>About Othello Organisation Singapore (OOS)</PageTitle>
      <InfoBlock title="What is OOS?">
        OOS (Othello Organisation Singapore) is the official organisation under
        WOF for Singapore players.
      </InfoBlock>
      <InfoBlock title="Does OOS organize tournament regularly?">
        Yes!
        <br /> Usually, OOS organized several tournaments in a year, comprises
        of Singapore Opens, Singapore National Othello Championship (SNOC), and
        Singapore Othello Master Series (SOMS). <br />
        OOS handbook for this year (2021) can be found{' '}
        <ExternalLink to="https://drive.google.com/file/d/14rsO7c_jMxQuQasPw4n-jPbA2Cu5B9G3/view?usp=sharing">
          here
        </ExternalLink>
        . <br /> <br />
        Note: This year (2021) tournament frequency will be reduced a lot
        because of COVID.
      </InfoBlock>
      <InfoBlock title="Does OOS actively join World Othello Championship (WOC)?">
        Yes, OOS actively send people to join World Othello Championship, and
        consistently getting decent results. <br />
        If you are interested to represent OOS for WOC, can start by joining
        Singapore local tournaments ;).
      </InfoBlock>
      <InfoBlock title="How do I reach out to OOS?">
        Please contact Alex (kohbochao@gmail.com) or Samuel
        (samuelhenrykurniawan@yahoo.com) to get in touch with OOS.
      </InfoBlock>
      <CaptionedImageGroup>
        <CaptionedImage src={SingaporePlayersCoffee}>
          Some Singapore players met up for coffee and Othello training (before
          COVID).
        </CaptionedImage>
        <CaptionedImage src={SingaporeVsJapan}>
          Some Japanese players came to Singapore and play a few friendly games
          with Singapore players.
        </CaptionedImage>
        <CaptionedImage src={MakotoSuekuni}>
          <ExternalLink to="https://www.worldothello.org/ratings/player?playerID=698">
            Suekuni Makoto
          </ExternalLink>
          , ex-world champion that started OOS and help trained Singapore first
          generation of players.
        </CaptionedImage>
        <CaptionedImage src={AlexKoh}>
          <ExternalLink to="https://www.worldothello.org/ratings/player?searchPlayerInput=KOH+Bo+Chao+Alex">
            Alex Koh
          </ExternalLink>
          , OOS President and coincidentally also one of the best players in
          Singapore.
        </CaptionedImage>
        <CaptionedImage src={SNOC2018}>
          Singapore National Othello Championship 2018.
        </CaptionedImage>
        <CaptionedImage src={SNOC2019}>
          Singapore National Othello Championship 2019.
        </CaptionedImage>
        <CaptionedImage src={SingaporeMaster2019}>
          Singapore Othello Master Series 2019.
        </CaptionedImage>
        <CaptionedImage src={SingaporeNSpy}>
          Team Singapore (+spy :p) in World Othello Championship 2019.
        </CaptionedImage>
        <CaptionedImage src={AlexLastTable}>
          Alex Koh playing in last table(?) in World Othello Championship 2019.
        </CaptionedImage>
        <CaptionedImage src={AlexVsYusuke}>
          Alex Koh playing against Takanashi Yusuke (6 times Othello World
          Champion) that ends in a very tight game.
        </CaptionedImage>
      </CaptionedImageGroup>
    </PageWrapper>
  );
}

export default AboutOOSPage;
