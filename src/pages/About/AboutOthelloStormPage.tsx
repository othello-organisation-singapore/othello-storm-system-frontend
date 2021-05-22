import React from 'react';

import { Typography } from 'antd';
const { Text } = Typography;

import {
  ExternalLink,
  InfoBlock,
  PageTitle,
  PageWrapper,
} from 'components/common';

function AboutOthelloStormPage() {
  return (
    <PageWrapper>
      <PageTitle>About Othello Storm System</PageTitle>
      <InfoBlock title="What is Othello Storm System?">
        Othello Storm System in an app, created by Othello Organisation
        Singapore (OOS), to help (at least for ourselves) to manage Othello
        tournaments.
      </InfoBlock>
      <InfoBlock title="Why Othello Storm System need to exists?">
        Previously, OOS is using{' '}
        <ExternalLink to="https://svenskothello.com/wp-content/uploads/2019/07/papp-eng.pdf">
          papp
        </ExternalLink>{' '}
        to manage our Othello tournaments. <br />
        However, only a small amount of people (small subset of OOS executive
        committee) are able to use papp, because of some reasons: <br />
        <ul>
          <li>
            Papp is using command line, it is non easy for non-tech related
            people to use it.
          </li>
          <li>Catalina update causing papp is non-runnable in mac.</li>
        </ul>
        Because of that, there is a huge dependency to a few people for OOS to
        organise tournaments, to the extend that the tournaments are scheduled
        around their availability, which is relatively unhealthy for long term.{' '}
        <br />
        Hence, we think it is better to have a user friendly app that is not
        dependent on OS, and thus, we decided to create a web app for it. <br />
        <br />
        Funfact: Storm is based on abbreviation of STOp Relying on Me.
      </InfoBlock>
      <InfoBlock title="What are the features of Othello Storm System?">
        Current features:
        <ul>
          <li>
            Auto obtaining list of players from{' '}
            <ExternalLink to="https://www.worldothello.org/files/joueurs.txt">
              WOF players list
            </ExternalLink>{' '}
            for existing players
          </li>
          <li>Auto pairing generation (round robin / swiss pairing).</li>
          <li>
            Able to see intermediate state standings until any round, not just
            the latest standing.
          </li>
          <li>Players can see standing online without logging in.</li>
        </ul>
        Planned features:
        <ul>
          <li>
            Able to send elo file (used for rating calculation by WOF) from
            tournament result in form of email.
          </li>
        </ul>
      </InfoBlock>
      <InfoBlock title="How do I start using Othello Storm System?">
        In order to start using the system as Tournament Director, you need to
        log in to the system. <br /> However, since we want to make this app
        into official tournaments app, the user registration can only be done by
        the admin. <br /> Please contact Alex (kohbochao@gmail.com) or Samuel
        (samuelhenrykurniawan@yahoo.com) if you are interested in using Othello
        Storm System for your tournament.
      </InfoBlock>
      <InfoBlock title="How does the minor score is calculated in Othello Storm System?">
        We are using Mixed Brightwell System, following closely how the minor
        scores are calculated in World Othello Championship.
        <br />
        For more details, can refer to{' '}
        <ExternalLink to="https://www.worldothello.org/about/tournaments/world-othello-championship/woc-rules">
          WOC Rules page
        </ExternalLink>
        .
      </InfoBlock>
      <InfoBlock title="How does the pairing calculated using Round Robin in Othello Storm System?">
        We are using the Circle Method of Round Robin Scheduling, can refer to{' '}
        <ExternalLink to="https://en.wikipedia.org/wiki/Round-robin_tournament#Circle_method">
          this wikipedia page
        </ExternalLink>
        .<br /> There is also one catch, for a given round, we will choose the
        pairings that makes the first player matched the highest ranked player
        that is not matched yet with the first player.
      </InfoBlock>
      <InfoBlock title="How does the pairing calculated using Swiss Pairing in Othello Storm System?">
        We are using simpler algorithm for swiss pairing, where the highest
        player just paired with the unmatched next highest player, and so on.{' '}
        <br /> For large number of players, the algorithm may run a bit slow.
        (Although we think it will be reasonable on reasonable number of
        players) <br /> <br />{' '}
        <Text type="danger">
          Warning!
          <br />
          This algorithm may produce no possible pairing, if the number of
          rounds is similar to the number of players. <br />
          If this happens, please proceed using manual pairing.
        </Text>
      </InfoBlock>
      <InfoBlock title="Can I contribute to Othello Storm System?">
        Yes!
        <br />
        Please contact Alex (kohbochao@gmail.com) or Samuel
        (samuelhenrykurniawan@yahoo.com) if you are interested to contribute to
        Othello Storm System, either in design, code, ideas, or even bug report.
      </InfoBlock>
    </PageWrapper>
  );
}

export default AboutOthelloStormPage;
