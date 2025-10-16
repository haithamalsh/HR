import request from 'supertest';
import express from 'express';
import cors from 'cors';

const createApp = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  const assets = [
    { id: 'a1', name: 'CNC Lathe', status: 'OPERATIONAL', location: 'Plant A' }
  ];
  app.get('/assets', (req, res) => res.json(assets));
  app.get('/assets/:id', (req, res) => {
    const asset = assets.find((a:any) => a.id === req.params.id);
    if (!asset) return res.status(404).json({ message: 'Not found' });
    res.json(asset);
  });
  return app;
};

describe('asset-service', () => {
  const app = createApp();
  it('lists assets', async () => {
    const res = await request(app).get('/assets');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0].id).toBe('a1');
  });

  it('gets asset by id', async () => {
    const res = await request(app).get('/assets/a1');
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('CNC Lathe');
  });

  it('returns 404 for missing asset', async () => {
    const res = await request(app).get('/assets/missing');
    expect(res.status).toBe(404);
  });
});
