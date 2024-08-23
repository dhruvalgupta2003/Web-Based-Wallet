import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Home from './components/homepage/Home';
import CreateWallet from './components/createWallet/CreateWallet';
import WalletBalance from './components/walletBalance/WalletBalance';
import WalletList from './components/walletList/WalletList';
import CreateTransaction from './components/connectWallet/CreateTransaction';
import { WalletProvider } from '@solana/wallet-adapter-react';
import { ConnectionProvider } from '@solana/wallet-adapter-react';
// import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import './App.css';
import GenerateQR from './components/generateQR/GenerateQR';
import { PublicKey } from '@solana/web3.js';

const App: React.FC = () => {
  const [solanaWallets, setSolanaWallets] = useState<string[]>([]);
  const [ethWallets, setEthWallets] = useState<string[]>([]);

  // Set up wallets for Solana
  const wallets = [new PhantomWalletAdapter()];

  return (
    <ConnectionProvider endpoint={'https://api.mainnet-beta.solana.com'}>
      <WalletProvider wallets={wallets} autoConnect>
        <Router>
          <div className="App">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route 
                path="/create-wallet" 
                element={
                  <CreateWallet 
                    setSolanaWallets={setSolanaWallets}  
                    setEthWallets={setEthWallets}
                  />
                } 
              />
              <Route 
                path="/wallet-list" 
                element={
                  <WalletList 
                    solanaWallets={solanaWallets} 
                    ethWallets={ethWallets}
                  />
                } 
              />
              <Route path="/wallet-balance" element={<WalletBalance />} />
              <Route 
                path="/create-transaction" 
                element={
                  <CreateTransaction 
                    solanaWallets={solanaWallets} 
                    ethWallets={ethWallets} 
                  />
                } 
              />
              <Route path='/generate-qr' element={<GenerateQR />} />
            </Routes>
          </div>
        </Router>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default App;