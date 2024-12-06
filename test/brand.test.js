const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const Brand = require('../models/Brand');

jest.setTimeout(10000);

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.close();
  app.close();
});

describe('POST /api/brand', () => {
  it('should create a new brand', async () => {
    const res = await request(app)
      .post('/api/brand')
      .send({ name: 'Nike' })
      .expect(201);
    expect(res.body.name).toBe('Nike');
  });

  it('should return 400 if brand name is missing', async () => {
    const res = await request(app)
      .post('/api/brand')
      .send({})
      .expect(400);
  });
});
