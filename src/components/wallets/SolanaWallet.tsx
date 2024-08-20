import { useState } from 'react';
import nacl from 'tweetnacl';
import { mnemonicToSeedSync } from 'bip39';
import { derivePath } from 'ed25519-hd-key';
import { Keypair } from '@solana/web3.js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Wallet.css';

interface SolanaWalletProps {
  mnemonic: string;
  onAddWallet: (publicKey: string) => void;
}
const SolanaWallet: React.FC<SolanaWalletProps>= ({ mnemonic, onAddWallet }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [publicKeys, setPublicKeys] = useState<string[]>([]);
  const navigate = useNavigate();

  const addWallet = () => {
    const seed = mnemonicToSeedSync(mnemonic);
    const path = `m/44'/501'/${currentIndex}'/0'`;
    const derivedSeed = derivePath(path, seed.toString('hex')).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const keypair = Keypair.fromSecretKey(secret);
    setCurrentIndex(currentIndex + 1);
    const publicKey = keypair.publicKey.toBase58();
    setPublicKeys([...publicKeys,publicKey]);
    onAddWallet(publicKey);
  };

  const goToWallet = (index: number) => {
    const publicKey = publicKeys[index];
    axios
      .post('https://solana-mainnet.g.alchemy.com/v2/NPZ6RbKlxVLo_H5I86gQ0Ul48PyimL5p', {
        jsonrpc: '2.0',
        id: 1,
        method: 'getBalance',
        params: [publicKey],
      })
      .then((response) => {
        const value = response.data.result.value;
        const balance = value / 1_000_000_000; // Convert lamports to SOL
        navigate('/wallet-balance', { state: { balance , currency: 'SOL'} });
      })
      .catch((error) => {
        console.error('Error fetching wallet info:', error);
        navigate('/wallet-balance', { state: { balance: 0, currency: 'SOL' } });
      });
  };

  return (
    <div className="wallet">
      <h2>Solana Wallets</h2>
      <button onClick={addWallet}>Add Wallet</button>
      <div className="keys-grid">
        {publicKeys.map((key, index) => (
          <div key={index} className="key-box">
            <p>{key}</p>
            <button onClick={() => goToWallet(index)}>Go To Wallet</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SolanaWallet;
