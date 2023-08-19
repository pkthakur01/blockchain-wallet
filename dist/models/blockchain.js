"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// models/blockchain.js
const mongoose_1 = require("mongoose");
const blockchainSchema = new mongoose_1.default.Schema({
    chain: Array, // Array of blocks
});
exports.default = mongoose_1.default.model('Blockchain', blockchainSchema);
