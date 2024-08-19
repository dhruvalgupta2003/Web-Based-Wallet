import { useState } from 'react';
import { mnemonicToSeed } from 'bip39';
import { Wallet, HDNodeWallet } from 'ethers';
import './Wallet.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EthWallet = ({ mnemonic }: { mnemonic: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [addresses, setAddresses] = useState<string[]>([]);
  const navigate = useNavigate();

  const addWallet = async () => {
    const seed = await mnemonicToSeed(mnemonic);
    const path = `m/44'/60'/${currentIndex}'/0'`;
    const hdNode = HDNodeWallet.fromSeed(seed);
    const child = hdNode.derivePath(path);
    const wallet = new Wallet(child.privateKey);
    setCurrentIndex(currentIndex + 1);
    setAddresses([...addresses, wallet.address]);
  };

  const goToWallet = (index: number) => {
    const address = addresses[index];
    axios.post('https://eth-mainnet.g.alchemy.com/v2/NPZ6RbKlxVLo_H5I86gQ0Ul48PyimL5p', {
      "jsonrpc": "2.0",
      "id": 1,
      "method": "eth_getBalance",
      "params": [address, "latest"]
    })
    .then((response) => {
      const value = parseInt(response.data.result, 16); // Convert hex to decimal
      const balance = value / 1_000_000_000_000_000_000; // Convert wei to ETH
      navigate('/wallet-balance', { state: { balance, currency: 'ETH' } });
    })
    .catch((error) => {
      console.error('Error fetching wallet info:', error);
      navigate('/wallet-balance', { state: { balance: 0, currency: 'ETH' } });
    });
  }

  return (
    <div className="wallet">
      <h2>Ethereum Wallets</h2>
      <button onClick={addWallet}>Add Wallet</button>
      <div className="keys-grid">
        {addresses.map((address, index) => (
          <div key={index} className="key-box">
            <p>{address}</p>
            <button onClick={() => goToWallet(index)}>Go To Wallet</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EthWallet;
