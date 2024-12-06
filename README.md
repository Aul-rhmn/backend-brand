# Backend

A backend API service for managing brands, vouchers, and transactions built using **Node.js**, **Express.js**, and **MongoDB**.

## Features
- Create and manage brands and vouchers.
- Perform voucher redemptions for customers.
- View transaction redemption details.
- Clean, modular, and testable codebase.

---

## Installation and Setup

### Prerequisites
- [Node.js](https://nodejs.org/) installed.
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account or local MongoDB setup.

---

### **1. Clone the Repository**
```bash
git clone <repository_url>
cd <repository_name>
```

---

### **2. Install Dependencies**
```bash
npm install
```

---

### **3. Set Up Environment Variables**
Create a `.env` file in the root directory and configure the following variables:

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/voucher-db?retryWrites=true&w=majority
PORT=3000
```

Replace:
- `<username>` and `<password>` with your MongoDB credentials.
- `voucher-db` with your desired database name.

---

### **4. Run the Application**
#### For Development:
```bash
npm run dev
```
#### For Production:
```bash
npm start
```

The server will run on `http://localhost:3000` by default.

---

### **5. Test the Endpoints**
You can test the API using tools like:
- [Postman](https://www.postman.com/).
- [cURL](https://curl.se/).

---

## Scripts

### Run Development Server:
```bash
npm run dev
```

### Run Tests:
```bash
npm test
```

### Lint Code:
```bash
npm run lint
```

---

## Dependencies
- **Node.js**: JavaScript runtime.
- **Express.js**: Web framework.
- **Mongoose**: MongoDB ORM.
- **Dotenv**: Environment variable management.
- **Jest**: Unit testing framework.

---
