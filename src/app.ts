import  { Request, Response } from 'express';
import express from 'express';

import bodyParser from 'body-parser';
import { Blockchain, Transaction } from './blockchain';

const app = express();
const port = 3000;

// Create an instance of the blockchain
const blockchain = new Blockchain();

app.use(bodyParser.json());

// Add transaction endpoint
app.post('/transaction', (req: Request, res: Response) => {
  const { fromAddress, toAddress, amount } = req.body;

  if (!fromAddress || !toAddress || !amount) {
    return res.status(400).json({ error: 'Missing required parameters.' });
  }

  const transaction = new Transaction(fromAddress, toAddress, amount);
  blockchain.addTransaction(transaction);

  return res.status(201).json({ message: 'Transaction added successfully.' });
});

// Get balance endpoint
app.get('/balance/:address', (req: Request, res: Response) => {
  const address = req.params.address;
  const balance = blockchain.getBalance(address);

  return res.json({ balance });
});

// Check transaction history endpoint
app.get('/transaction-history/:address', (req: Request, res: Response) => {
  const address = req.params.address;
  const transactions = blockchain.getTransactionHistory(address);

  return res.json({ transactions });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
