const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const Brand = require('../models/Brand');
const Voucher = require('../models/Voucher');
const Transaction = require('../models/Transaction');

let brandId, voucherId;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  const brand = new Brand({ name: 'Nike' });
  const savedBrand = await brand.save();
  brandId = savedBrand._id;

  const voucher = new Voucher({
    name: 'Nike Air Max',
    costInPoints: 100,
    brand: brandId,
  });
  const savedVoucher = await voucher.save();
  voucherId = savedVoucher._id;
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('POST /api/transaction/redemption', () => {
  it('should create a transaction', async () => {
    const res = await request(app)
      .post('/api/transaction/redemption')
      .send({
        customerId: 'customer123',
        vouchers: [{ voucherId, quantity: 2 }],
      })
      .expect(201);

    expect(res.body.customerId).toBe('customer123');
    expect(res.body.totalPointsSpent).toBe(200);
  });

  it('should return 400 if transaction data is missing', async () => {
    const res = await request(app)
      .post('/api/transaction/redemption')
      .send({})
      .expect(400);

    expect(res.body.message).toBeDefined();
  });
});

describe('GET /api/transaction/redemption', () => {
  it('should retrieve a transaction by ID', async () => {
    const transaction = new Transaction({
      customerId: 'customer123',
      vouchers: [{ voucher: voucherId, quantity: 2 }],
      totalPointsSpent: 200,
    });
    const savedTransaction = await transaction.save();

    const res = await request(app)
      .get(`/api/transaction/redemption?transactionId=${savedTransaction._id}`)
      .expect(200);

    expect(res.body.customerId).toBe('customer123');
    expect(res.body.totalPointsSpent).toBe(200);
  });

  it('should return 404 if transaction not found', async () => {
    const res = await request(app)
      .get('/api/transaction/redemption?transactionId=invalidId')
      .expect(404);

    expect(res.body.message).toBe('Transaction not found');
  });
});
