import React from 'react';

import { TournamentTypes } from 'utils/enums';

export const TournamentTypeDisplays = {
  [TournamentTypes.RoundRobin]: 'Round Robin',
  [TournamentTypes.SwissPairing]: 'Swiss Pairing',
  [TournamentTypes.Unidentified]: '?',
};
