import React from 'react';

import ExternalLink from 'components/ExternalLink';
import InfoBlock from 'components/InfoBlock';
import { PageTitle } from 'components/Typography';

function ResourcePlatformPage() {
  return (
    <div>
      <PageTitle>Othello Resources (Online Platforms)</PageTitle>
      <InfoBlock title="Othello Quest">
        Othello Quest is the most widely used Othello Platforms by Othello
        communities. <br /> This platforms allow you to play realtime ranked
        match or with friends with thinking time 1 min or 5 mins. <br />
        You can access the platform for free either on{' '}
        <ExternalLink to="https://apps.apple.com/us/app/reversi-wars-online-othello/id859831183?l=ja&ls=1">
          AppStore
        </ExternalLink>{' '}
        or{' '}
        <ExternalLink to="https://play.google.com/store/apps/details?id=fm.wars.reversi">
          PlayStore
        </ExternalLink>
        .
      </InfoBlock>
      <InfoBlock title="Eothello">
        Eothello is one of the more widely used Othello Platforms by Othello
        communities. <br /> This platforms allow you to play online with
        thinking time of 3 days per move. <br />
        You can access the platform for free{' '}
        <ExternalLink to="https://www.eothello.com/">here</ExternalLink> .
      </InfoBlock>
      <InfoBlock title="Playok">
        Playok used to be one of the most widely used platforms before Othello
        Quest and Eothello. <br />
        However, a lot of online tournaments were hosted here <br />
        You can access the platform for free{' '}
        <ExternalLink to="https://www.playok.com/en/reversi/">
          here
        </ExternalLink>{' '}
        .
      </InfoBlock>
    </div>
  );
}

export default ResourcePlatformPage;
