import React, { useEffect, useState } from 'react';
import axios from 'axios';

export type Asset = {
  id: string;
  name: string;
  status: string;
  location?: string;
};

export const AssetsList: React.FC = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    axios.get('/api/assets')
      .then(res => setAssets(res.data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading assets...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h3>Assets</h3>
      <ul>
        {assets.map(a => (
          <li key={a.id}>{a.name} - {a.status} {a.location ? `(${a.location})` : ''}</li>
        ))}
      </ul>
    </div>
  );
};

export default AssetsList;
