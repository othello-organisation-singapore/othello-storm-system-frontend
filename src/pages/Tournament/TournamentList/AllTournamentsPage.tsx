import React from 'react';

import useGet from 'hooks/useGet';
import { TournamentsResponse } from 'utils/apiResponseShapes';

function AllTournamentsPage() {
  const { data } = useGet<TournamentsResponse>('/api/tournaments/');
  return null;
}

export default AllTournamentsPage;
