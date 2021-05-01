import React from 'react';

import ExternalLink from 'components/ExternalLink';
import InfoBlock from 'components/InfoBlock';
import { PageTitle } from 'components/Typography';

function ResourceVideoPage() {
  return (
    <div>
      <PageTitle>Othello Resource (Video)</PageTitle>
      <InfoBlock title="Othello Academy">
        Othello Academy is a Youtube Channel created by Alex Koh, Othello
        Organisation Singapore's President and one of the top players in
        Singapore. <br />
        There are a lot of contents currently, including basic and intermediate
        strategies, puzzles and exhibition games. <br />
        You can access the channel{' '}
        <ExternalLink to="https://www.youtube.com/channel/UC5gN3XtwfOaFFMZtNauXl2A">
          here
        </ExternalLink>
        . <br />
        Your subscription, likes, and shares are appreciated :). <br /> <br />
        <iframe
          style={{ maxWidth: '100%' }}
          width="560"
          height="315"
          src="https://www.youtube.com/embed/8z6CIGXMSbY"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </InfoBlock>
    </div>
  );
}

export default ResourceVideoPage;
