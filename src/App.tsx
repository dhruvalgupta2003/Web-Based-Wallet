import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Home from './components/homepage/Home';
import CreateWallet from './components/createWallet/CreateWallet'
import './App.css';
import WalletBalance from './components/walletBalance/WalletBalance';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-wallet" element={<CreateWallet />} />
        <Route path="/wallet-balance" element={<WalletBalance/>} />
      </Routes>
    </Router>
  );
}

export default App;
