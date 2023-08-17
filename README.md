# Blockchain Wallet

This project is a simple backend service that simulates a wallet on a blockchain. It uses TypeScript, Node.js, and Express to provide REST API endpoints for managing transactions and checking balances on a blockchain.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

This application provides the following features:

- Add transaction: Create a transaction from one address to another.
- Get balance: Retrieve the balance of an address.
- Check transaction history: View all transactions associated with an address.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following:

- Node.js (v14 or higher)
- npm (Node Package Manager)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/pkthakur01/blockchain-wallet.git

2. Navigate to the project directory:
```cd your-project

3. Install the dependencies:
```npm install

###Usage

1. Start the application:
npm start

2. Access the API endpoints using a tool like curl or Postman. See API Endpoints section for details


###API Endpoints
###Add Transaction

Endpoint: POST /transaction
Request Body: { "fromAddress": "senderAddress", "toAddress": "receiverAddress", "amount": 100 }
Response: { "message": "Transaction added successfully." }

###Get Balance

Endpoint: GET /balance/:address
Response: { "balance": 200 }

###Check Transaction History

Endpoint: GET /transaction-history/:address
Response: { "transactions": [...] }



