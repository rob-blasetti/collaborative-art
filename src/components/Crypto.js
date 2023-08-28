import React, { useState } from 'react';
import { TransactionBuilder, networks } from 'bitcoinjs-lib';

const BitcoinRefundComponent = () => {
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState(0.001); // BTC amount
  const [lockTime, setLockTime] = useState(Math.floor(Date.now() / 1000) + 3600); // 1 hour from now

  const generateTransaction = () => {
    const network = networks.bitcoin;
    const txBuilder = new TransactionBuilder(network);

    // Set the input and output details
    txBuilder.addInput('transactionHash', 0); // Replace with actual transaction hash and index
    txBuilder.addOutput(address, amount * 1e8); // Convert BTC to Satoshis

    // Set the locktime
    txBuilder.setLockTime(lockTime);

    const tx = txBuilder.build();
    const txHex = tx.toHex();

    console.log('Unsigned Transaction Hex:', txHex);
  };

  return (
    <div>
      <h1>Bitcoin Refundable Transaction</h1>
      <div>
        <label>Recipient Address:</label>
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
      </div>
      <div>
        <label>Amount (BTC):</label>
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
      </div>
      <div>
        <label>Lock Time (Unix Timestamp):</label>
        <input type="number" value={lockTime} onChange={(e) => setLockTime(e.target.value)} />
      </div>
      <button onClick={generateTransaction}>Generate Transaction</button>
    </div>
  );
};

export default BitcoinRefundComponent;
