const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const Brand = require('../models/Brand');
const Voucher = require('../models/Voucher');

let brandId;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

  const brand = new Brand({ name: 'Nike' });
  const savedBrand = await brand.save();
  brandId = savedBrand._id;
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('POST /api/voucher', () => {
  it('should create a new voucher', async () => {
    const res = await request(app)
      .post('/api/voucher')
      .send({
        name: 'Nike Air Max',
        costInPoints: 100,
        brand: brandId,
      })
      .expect(201);

    expect(res.body.name).toBe('Nike Air Max');
    expect(res.body.costInPoints).toBe(100);
    expect(res.body.brand).toBe(String(brandId));
  });

  it('should return 400 if voucher data is missing', async () => {
    const res = await request(app)
      .post('/api/voucher')
      .send({})
      .expect(400);

    expect(res.body.message).toBeDefined();
  });
});

describe('GET /api/voucher', () => {
  it('should retrieve a voucher by ID', async () => {
    const voucher = new Voucher({
      name: 'Nike Air Max',
      costInPoints: 100,
      brand: brandId,
    });
    const savedVoucher = await voucher.save();

    const res = await request(app)
      .get(`/api/voucher?id=${savedVoucher._id}`)
      .expect(200);

    expect(res.body.name).toBe('Nike Air Max');
    expect(res.body.costInPoints).toBe(100);
  });

  it('should return 404 if voucher not found', async () => {
    const res = await request(app)
      .get('/api/voucher?id=invalidId')
      .expect(404);

    expect(res.body.message).toBe('Voucher not found');
  });
});
