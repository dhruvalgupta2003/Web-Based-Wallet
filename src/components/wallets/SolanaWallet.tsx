import { useState } from 'react';
import nacl from 'tweetnacl';
import { mnemonicToSeedSync } from 'bip39'; // Import mnemonicToSeedSync for synchronous operation
import { derivePath } from 'ed25519-hd-key';
import { Keypair } from '@solana/web3.js';
import './Wallet.css';

const SolanaWallet = ({ mnemonic }: { mnemonic: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [publicKeys, setPublicKeys] = useState<string[]>([]);

  const addWallet = () => {
    const seed = mnemonicToSeedSync(mnemonic); // Use mnemonicToSeedSync here
    const path = `m/44'/501'/${currentIndex}'/0'`;
    const derivedSeed = derivePath(path, seed.toString('hex')).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const keypair = Keypair.fromSecretKey(secret);
    setCurrentIndex(currentIndex + 1);
    setPublicKeys([...publicKeys, keypair.publicKey.toBase58()]);
  };

  return (
    <div className="wallet">
      <h2>Solana Wallets</h2>
      <button onClick={addWallet}>Add Wallet</button>
      <div className="keys-grid">
        {publicKeys.map((key, index) => (
          <div key={index} className="key-box">
            {key}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SolanaWallet;
