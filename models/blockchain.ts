// models/blockchain.js
import mongoose from 'mongoose';

const blockchainSchema = new mongoose.Schema({
  chain: Array, // Array of blocks
});

export default mongoose.model('Blockchain', blockchainSchema);
