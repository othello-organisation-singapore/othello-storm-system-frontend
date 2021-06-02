import { useState } from 'react';

function useRefreshKey() {
  const [refreshKey, setRefreshKey] = useState(0);
  return {
    refreshKey,
    refresh: () => setRefreshKey(r => (r + 1) % 1000000),
  };
}

export default useRefreshKey;
