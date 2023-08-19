import mongoose from 'mongoose';
import BlockchainModel from '../dist/models/blockchain';
/**
 * Transaction represents a transfer of value from one address to another.
 * In this simplified scenario, a transaction has a single recipient.
 */
export class Transaction {
    constructor(
      public fromAddress: string | null,
      public toAddress: string,
      public amount: number
    ) {}
  }
  
  /**
   * Block represents a set of transactions.
   * In this simplified scenario, a block contains a single transaction.
   */
  export class Block {
    public nonce = Math.round(Math.random() * 999999999);
  
    constructor(
      public prevHash: string,
      public transaction: Transaction,
      public timestamp = Date.now()
    ) {}
  
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
  
  /**
   * Blockchain represents a chain of blocks, with methods for adding blocks
   * and checking the integrity of the chain.
   */
  export class Blockchain {
    public chain: Block[];
  
    constructor() {
      this.chain = [this.createGenesisBlock()];
      this.loadBlockchainFromDatabase();
    }
  
    /**
     * Create the initial block for the blockchain.
     */
    private createGenesisBlock() {
      return new Block("", new Transaction(null, "", 0));
    }
  
    /**
     * Get the latest block in the chain.
     */
    private get latestBlock() {
      return this.chain[this.chain.length - 1];
    }

    private async loadBlockchainFromDatabase() {
      try {
        const blockchainData = await BlockchainModel.findOne();
        if (blockchainData) {
          this.chain = blockchainData.chain;
        }
      } catch (err) {
        console.error('Error loading blockchain from database:', err);
      }
    }
  
    private async saveBlockchainToDatabase() {
      try {
        await BlockchainModel.findOneAndUpdate({}, { chain: this.chain }, { upsert: true });
      } catch (err) {
        console.error('Error saving blockchain to database:', err);
      }
    }
  
    /**
     * Add a new transaction to the blockchain. The transaction is placed in a new block.
     */
    public addTransaction(transaction: Transaction) {
      const newBlock = new Block(
        this.latestBlock.hash,
        transaction,
        Date.now()
      );
      this.saveBlockchainToDatabase();
      this.chain.push(newBlock);
    }
  
    /**
     * Get the balance of an address by aggregating the amounts in the related transactions.
     */
    public getBalance(address: string) {
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
  public getTransactionHistory(address: string) {
    const transactions: Transaction[] = [];

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
  