import express from 'express';
import cors from 'cors';

type Asset = {
  id: string;
  name: string;
  status: 'OPERATIONAL' | 'MAINTENANCE' | 'DECOMMISSIONED';
  location?: string;
};

const app = express();
app.use(cors());
app.use(express.json());

const assets: Asset[] = [
  { id: 'a1', name: 'CNC Lathe', status: 'OPERATIONAL', location: 'Plant A' },
  { id: 'a2', name: '3D Printer', status: 'MAINTENANCE', location: 'Plant B' }
];

app.get('/assets', (req, res) => {
  res.json(assets);
});

app.get('/assets/:id', (req, res) => {
  const asset = assets.find(a => a.id === req.params.id);
  if (!asset) return res.status(404).json({ message: 'Not found' });
  res.json(asset);
});

app.post('/assets', (req, res) => {
  const { name, location } = req.body;
  if (!name) return res.status(400).json({ message: 'name required' });
  const newAsset: Asset = { id: `a${Date.now()}`, name, status: 'OPERATIONAL', location };
  assets.push(newAsset);
  res.status(201).json(newAsset);
});

const port = process.env.PORT || 4001;
app.listen(port, () => console.log(`asset-service listening on ${port}`));
