import React from 'react';

import {
  ExternalLink,
  InfoBlock,
  PageTitle,
  PageWrapper,
} from 'components/common';

function ResourceBookPage() {
  return (
    <PageWrapper>
      <PageTitle>Othello Resource (Book)</PageTitle>
      <InfoBlock title="Brian Rose's Book">
        Brian Rose book titled 'Othello: A Minute to Learn, A Lifetime to
        Master' is the book that is widely accepted by Othello communities as
        the Othello 101 book. <br /> You can get the book for free{' '}
        <ExternalLink to="https://www.ffothello.org/livres/othello-book-Brian-Rose.pdf">
          here
        </ExternalLink>
        .
      </InfoBlock>
    </PageWrapper>
  );
}

export default ResourceBookPage;
