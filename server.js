const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const brandRoutes = require('./routes/brandRoutes');
const voucherRoutes = require('./routes/voucherRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

dotenv.config();

const app = express();
app.use(express.json()); 

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api/brand', brandRoutes);
app.use('/api/voucher', voucherRoutes);
app.use('/api/transaction', transactionRoutes);

const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
