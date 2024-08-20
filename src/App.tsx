import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Home from './components/homepage/Home';
import CreateWallet from './components/createWallet/CreateWallet';
import WalletBalance from './components/walletBalance/WalletBalance';
import WalletList from './components/walletList/WalletList';
import './App.css';
import ConnectWallet from './components/connectWallet/ConnectWallet';

const App: React.FC = () => {
  const [solanaWallets, setSolanaWallets] = useState<string[]>([]);
  const [ethWallets, setEthWallets] = useState<string[]>([]);

  return (
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
          <Route path="/connect-wallet" element={<ConnectWallet />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;