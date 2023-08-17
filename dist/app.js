"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const body_parser_1 = require("body-parser");
const blockchain_1 = require("./blockchain");
const app = (0, express_1)();
const port = 3000;
// Create an instance of the blockchain
const blockchain = new blockchain_1.Blockchain();
app.use(body_parser_1.json());
// Add transaction endpoint
app.post('/transaction', (req, res) => {
    const { fromAddress, toAddress, amount } = req.body;
    if (!fromAddress || !toAddress || !amount) {
        return res.status(400).json({ error: 'Missing required parameters.' });
    }
    const transaction = new blockchain_1.Transaction(fromAddress, toAddress, amount);
    blockchain.addTransaction(transaction);
    return res.status(201).json({ message: 'Transaction added successfully.' });
});
// Get balance endpoint
app.get('/balance/:address', (req, res) => {
    const address = req.params.address;
    const balance = blockchain.getBalance(address);
    return res.json({ balance });
});
// Check transaction history endpoint
app.get('/transaction-history/:address', (req, res) => {
    const address = req.params.address;
    const transactions = blockchain.getTransactionHistory(address);
    return res.json({ transactions });
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
