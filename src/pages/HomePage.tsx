import React from 'react';

import useFetch from 'hooks/useFetch';
import { HttpMethod } from 'enums';

function HomePage() {
  const _ = useFetch(
    'http://localhost:8000/api/users/chrismaxheart/',
    HttpMethod.GET
  );

  return <div>Hi, this is the home page</div>;
}

export default HomePage;
