import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

type InventoryItem = {
  id: string;
  name: string;
  quantity: number;
  minLevel?: number;
};

const items: InventoryItem[] = [
  { id: 'i1', name: 'Bearing', quantity: 150, minLevel: 20 },
  { id: 'i2', name: 'Belt', quantity: 40, minLevel: 10 }
];

app.get('/inventory', (req, res) => res.json(items));
app.post('/inventory/items', (req, res) => {
  const { name, quantity, minLevel } = req.body;
  if (!name) return res.status(400).json({ message: 'name required' });
  const newItem = { id: `i${Date.now()}`, name, quantity: quantity || 0, minLevel };
  items.push(newItem);
  res.status(201).json(newItem);
});

const port = process.env.PORT || 4002;
app.listen(port, () => console.log(`inventory-service listening on ${port}`));
