import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './WalletBalance.css';
import { Connection, PublicKey } from '@solana/web3.js';
import solIcon from '../../assets/sol.svg';
import { Link } from 'react-router-dom';
import ethIcon from '../../assets/eth.svg';

const WalletBalance = () => {
  const location = useLocation();
  const { currency = 'SOL', publicKey: publicKeyString } = location.state || {};
  const [balance, setBalance] = useState<number | null>(null);
  const [currentSolToUsdExRate, setCurrentSolToUsdExRate] = useState<number | null>(null);
  const [currentEthToUsdExRate, setCurrentEthToUsdExRate] = useState<number | null>(null);
  const [solPercentChange15m, setSolPercentChange15m] = useState<number | null>(null);
  const [ethPercentChange15m, setEthPercentChange15m] = useState<number | null>(null);
  const [walletBalanceInUsd, setWalletBalanceInUsd] = useState<number | null>(null);
  const [showPublicKey, setShowPublicKey] = useState(false);

  // Convert publicKeyString to a PublicKey object if it's a string
  const publicKey = publicKeyString ? new PublicKey(publicKeyString) : null;

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const [solResponse, ethResponse] = await Promise.all([
          axios.get('https://api.coinpaprika.com/v1/tickers/sol-solana'),
          axios.get('https://api.coinpaprika.com/v1/tickers/eth-ethereum')
        ]);
        // Set up connection to the Solana devnet
        const connection = new Connection("https://api.devnet.solana.com");

        const solData = solResponse.data;
        const ethData = ethResponse.data;

        const solRate = solData.quotes.USD.price;
        const ethRate = ethData.quotes.USD.price;
        const solChange15m = solData.quotes.USD.percent_change_15m;
        const ethChange15m = ethData.quotes.USD.percent_change_15m;

        setCurrentSolToUsdExRate(solRate);
        setCurrentEthToUsdExRate(ethRate);
        setSolPercentChange15m(solChange15m);
        setEthPercentChange15m(ethChange15m);

        const rate = currency === 'SOL' ? solRate : ethRate;
        
        if (publicKey) {
          let latestBalance = await connection.getBalance(publicKey);
          latestBalance = latestBalance / 1000_000_000
          setBalance(latestBalance);

          const balanceInUsd = latestBalance * rate;
          setWalletBalanceInUsd(balanceInUsd);
        }
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
        setCurrentSolToUsdExRate(null);
        setCurrentEthToUsdExRate(null);
        setSolPercentChange15m(null);
        setEthPercentChange15m(null);
        setWalletBalanceInUsd(null); // Fallback to null for balance
      }
    };

    fetchExchangeRates();
  }, [currency, publicKey]);

  const togglePublicKey = () => {
    setShowPublicKey(!showPublicKey);
  };

  const getTokenPrice = () => {
    if (currency === 'SOL') {
      return currentSolToUsdExRate !== null ? `$${currentSolToUsdExRate.toFixed(2)}` : 'Loading...';
    } else {
      return currentEthToUsdExRate !== null ? `$${currentEthToUsdExRate.toFixed(2)}` : 'Loading...';
    }
  };

  const getPercentChange = () => {
    const percentChange = currency === 'SOL' ? solPercentChange15m : ethPercentChange15m;
    if (percentChange !== null) {
      return `${percentChange >= 0 ? '+' : ''}${percentChange.toFixed(2)}%`;
    }
    return 'Loading...';
  };

  const getPercentChangeClass = () => {
    const percentChange = currency === 'SOL' ? solPercentChange15m : ethPercentChange15m;
    if (percentChange !== null) {
      return percentChange >= 0 ? 'positive' : 'negative';
    }
    return 'neutral'; // Or 'loading' if you prefer a distinct style for loading
  };

  return (
    <div className="wallet-balance">
      <div className="wallet-header">
        <div className="wallet-dropdown">
          <span className="wallet-icon">🐸</span>
          Wallet 1 <span className="dropdown-arrow">▼</span>
        </div>
      </div>
      <div className="portfolio">
        <h3>YOUR PORTFOLIO</h3>
        <h2>${walletBalanceInUsd !== null ? walletBalanceInUsd.toFixed(2) : 'Loading...'}</h2>
        <div className="public-key">
          <span>{showPublicKey ? publicKeyString : publicKeyString?.slice(0, 4) + '...' + publicKeyString?.slice(-4)}</span>
          <button onClick={togglePublicKey}>👁️</button>
        </div>
      </div>
      <div className="action-buttons">
        <button>Deposit</button>
        <Link to='/create-transaction' 
        state={{ walletAddress: publicKeyString }} // Pass the public key as a state prop
        >
          <button>Send</button>
        </Link>
        <button>Scan</button>
      </div>
      <div className="available-tokens">
        <h4>Available Tokens</h4>
        {currency && (
          <div className="token">
            <div className="token-left">
              <img src={currency === 'SOL' ? solIcon : ethIcon} alt={currency} />
              <div className="token-info">
                <span className="token-name">{currency === "SOL" ? "Solana" : "Ethereum"}</span>
                <span className="token-amount">{balance ? balance.toFixed(2) : 0} {currency}</span>
              </div>
            </div>
            <div className="token-value">
              <span>{getTokenPrice()}</span>
              <span className={getPercentChangeClass()}>
                {getPercentChange()}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletBalance;
