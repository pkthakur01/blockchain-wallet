// src/app.ts
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { Blockchain, Transaction } from './blockchain';

const MONGODB_URI = 'mongodb://localhost:27017/blockchain-wallet';


mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB database');
  })
  .catch(error => {
    console.error('MongoDB connection error:', error);
  });

const blockchain = new Blockchain();
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/transaction', (req: Request, res: Response) => {
  const { fromAddress, toAddress, amount } = req.body;

  if (!fromAddress || !toAddress || !amount) {
    return res.status(400).json({ error: 'Missing required parameters.' });
  }

  const transaction = new Transaction(fromAddress, toAddress, amount);
  blockchain.addTransaction(transaction);

  return res.status(201).json({ message: 'Transaction added successfully.' });
});

app.get('/balance/:address', (req: Request, res: Response) => {
  const address = req.params.address;
  const balance = blockchain.getBalance(address);

  return res.json({ balance });
});

app.get('/transaction-history/:address', (req: Request, res: Response) => {
  const address = req.params.address;
  const transactions = blockchain.getTransactionHistory(address);

  return res.json({ transactions });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
