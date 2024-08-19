import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './WalletBalance.css';

const WalletBalance = () => {
  const location = useLocation();
  const { balance = 0, currency = 'SOL' } = location.state || {};
  const [_currentSolToUsdExRate, setCurrentSolToUsdExRate] = useState<number | null>(null);
  const [_currentEthToUsdExRate, setCurrentEthToUsdExRate] = useState<number | null>(null);
  const [walletBalanceInUsd, setWalletBalanceInUsd] = useState<number | null>(null);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const [solResponse, ethResponse] = await Promise.all([
          axios.get('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd'),
          axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd')
        ]);

        const solRate = solResponse.data.solana.usd;
        const ethRate = ethResponse.data.ethereum.usd;
        
        setCurrentSolToUsdExRate(solRate);
        setCurrentEthToUsdExRate(ethRate);

        const rate = currency === 'SOL' ? solRate : ethRate;
        const balanceInUsd = balance * rate;
        setWalletBalanceInUsd(balanceInUsd);
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
        setCurrentSolToUsdExRate(0);
        setCurrentEthToUsdExRate(0);
        setWalletBalanceInUsd(balance); // Fallback to balance in the base currency
      }
    };

    fetchExchangeRates();
  }, [balance, currency]);

  return (
    <div className="wallet-balance">
      <h3>Wallet Balance:</h3>
      <h3>{currency} Balance: {balance.toFixed(4)}</h3>
      <h3>USD Equivalent: ${walletBalanceInUsd !== null ? walletBalanceInUsd.toFixed(2) : 'Loading...'}</h3>
    </div>
  );
};

export default WalletBalance;
