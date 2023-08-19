"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blockchain = exports.Block = exports.Transaction = void 0;
const blockchain_1 = require("../models/blockchain");
/**
 * Transaction represents a transfer of value from one address to another.
 * In this simplified scenario, a transaction has a single recipient.
 */
class Transaction {
    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}
exports.Transaction = Transaction;
/**
 * Block represents a set of transactions.
 * In this simplified scenario, a block contains a single transaction.
 */
class Block {
    constructor(prevHash, transaction, timestamp = Date.now()) {
        this.prevHash = prevHash;
        this.transaction = transaction;
        this.timestamp = timestamp;
        this.nonce = Math.round(Math.random() * 999999999);
    }
    /**
     * Generates a simple hash for the block data.
     * In a real blockchain, a more secure method would be used.
     */
    get hash() {
        const str = JSON.stringify(this);
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash += str.charCodeAt(i);
        }
        return hash.toString();
    }
}
exports.Block = Block;
/**
 * Blockchain represents a chain of blocks, with methods for adding blocks
 * and checking the integrity of the chain.
 */
class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.loadBlockchainFromDatabase();
    }
    /**
     * Create the initial block for the blockchain.
     */
    createGenesisBlock() {
        return new Block("", new Transaction(null, "", 0));
    }
    /**
     * Get the latest block in the chain.
     */
    get latestBlock() {
        return this.chain[this.chain.length - 1];
    }
    loadBlockchainFromDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const blockchainData = yield blockchain_1.default.findOne();
                if (blockchainData) {
                    this.chain = blockchainData.chain;
                }
            }
            catch (err) {
                console.error('Error loading blockchain from database:', err);
            }
        });
    }
    saveBlockchainToDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield blockchain_1.default.findOneAndUpdate({}, { chain: this.chain }, { upsert: true });
            }
            catch (err) {
                console.error('Error saving blockchain to database:', err);
            }
        });
    }
    // constructor() {
    // }
    /**
     * Add a new transaction to the blockchain. The transaction is placed in a new block.
     */
    addTransaction(transaction) {
        const newBlock = new Block(this.latestBlock.hash, transaction, Date.now());
        this.saveBlockchainToDatabase();
        this.chain.push(newBlock);
    }
    /**
     * Get the balance of an address by aggregating the amounts in the related transactions.
     */
    getBalance(address) {
        let balance = 0;
        for (const block of this.chain) {
            const { fromAddress, toAddress, amount } = block.transaction;
            if (fromAddress === address) {
                balance -= amount;
            }
            if (toAddress === address) {
                balance += amount;
            }
        }
        return balance;
    }
    /**
   * Get the transaction history associated with an address.
   */
    getTransactionHistory(address) {
        const transactions = [];
        for (const block of this.chain) {
            const { fromAddress, toAddress, amount } = block.transaction;
            if (fromAddress === address || toAddress === address) {
                transactions.push({
                    fromAddress,
                    toAddress,
                    amount
                });
            }
        }
        return transactions;
    }
}
exports.Blockchain = Blockchain;
//   // src/blockchain.ts
// import mongoose from 'mongoose';
// import BlockchainModel from '../models/blockchain';
// // ... (Transaction and Block classes)
// export class Blockchain {
//   // ... (existing methods)
//   private async loadBlockchainFromDatabase() {
//     try {
//       const blockchainData = await BlockchainModel.findOne();
//       if (blockchainData) {
//         this.chain = blockchainData.chain;
//       }
//     } catch (err) {
//       console.error('Error loading blockchain from database:', err);
//     }
//   }
//   private async saveBlockchainToDatabase() {
//     try {
//       await BlockchainModel.findOneAndUpdate({}, { chain: this.chain }, { upsert: true });
//     } catch (err) {
//       console.error('Error saving blockchain to database:', err);
//     }
//   }
//   constructor() {
//     this.loadBlockchainFromDatabase();
//   }
//   public addTransaction(transaction: Transaction) {
//     // ... (existing code)
//     this.saveBlockchainToDatabase();
//   }
//   // ... (other methods)
// }
