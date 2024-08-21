import React, { useState, useCallback } from 'react';
import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { useWallet } from '@solana/wallet-adapter-react';
import './CreateTransaction.css';

interface CreateTransactionProps {
  solanaWallets: string[];
  ethWallets: string[];
}

const CreateTransaction: React.FC<CreateTransactionProps> = () => {
  const { publicKey, sendTransaction } = useWallet();
  const [selectedNetwork, setSelectedNetwork] = useState<'solana' | 'ethereum'>('solana');
  const [selectedWallet, setSelectedWallet] = useState<string>('');
  const [recipient, setRecipient] = useState<string>('');
  const [amount, setAmount] = useState<string>('');

  // Set up connection to the Solana devnet
  const connection = new Connection("https://api.devnet.solana.com");

  const handleNetworkChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedNetwork(event.target.value as 'solana' | 'ethereum');
    setSelectedWallet(''); // Reset wallet selection when network changes
  };

  const handleTransaction = useCallback(async () => {
    if (!selectedWallet || !recipient || !amount) {
      alert('Please fill all fields');
      return;
    }

    if (selectedNetwork === 'solana' && publicKey) {
      try {
        const lamportsToSend = parseFloat(amount) * LAMPORTS_PER_SOL;

        // Log the sender's balance before sending the transaction
        const balance = await connection.getBalance(publicKey);
        console.log("Current balance:", balance / LAMPORTS_PER_SOL);

        const transaction = new Transaction().add(
          SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: new PublicKey(recipient),
            lamports: lamportsToSend,
          })
        );

        const signature = await sendTransaction(transaction, connection);
        console.log("Transaction signature:", signature);

        await connection.confirmTransaction(signature, 'processed');
        console.log("Transaction confirmed");
      } catch (error) {
        console.error("Transaction failed:", error);
      }
    } else {
      // Implement Ethereum transaction logic using ethers.js
      console.log(`Sending ${amount} ETH from ${selectedWallet} to ${recipient}`);
      // Add Ethereum transaction logic here
    }
  }, [publicKey, sendTransaction, connection, amount, recipient, selectedNetwork, selectedWallet]);

  return (
    <div className="create-transaction">
      <h2>Create Transaction</h2>
      <div>
        <label htmlFor="network-select">Select Network:</label>
        <select id="network-select" value={selectedNetwork} onChange={handleNetworkChange}>
          <option value="solana">Solana</option>
          <option value="ethereum">Ethereum</option>
        </select>
      </div>
      <div>
        <label htmlFor="wallet-select">Select Wallet:</label>
        <input
          id="wallet-select"
          onChange={(e) => setSelectedWallet(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="recipient">Recipient Address:</label>
        <input
          type="text"
          id="recipient"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="amount">Amount:</label>
        <input
          type="text"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <button className="btn" onClick={handleTransaction}>Send Transaction</button>
    </div>
  );
};

export default CreateTransaction;
