import React, { useState } from 'react';
import { generateMnemonic } from 'bip39';
import SolanaWallet from '../wallets/SolanaWallet';
import EthWallet from '../wallets/EthWallet';
import './CreateWallet.css';

interface CreateWalletProps {
  setSolanaWallets: React.Dispatch<React.SetStateAction<string[]>>;
  setEthWallets: React.Dispatch<React.SetStateAction<string[]>>;
}

const CreateWallet: React.FC<CreateWalletProps> = ({ setSolanaWallets, setEthWallets }) => {
  const [mnemonic, setMnemonic] = useState<string>('');

  const handleAddSolanaWallet = (publicKey: string) => {
    setSolanaWallets(prevWallets => [...prevWallets, publicKey]);
  };

  const handleAddEthWallet = (address: string) => {
    setEthWallets(prevWallets => [...prevWallets, address]);
  };

  const handleGenerateMnemonic = () => {
    const phrase = generateMnemonic();
    setMnemonic(phrase);
  };

  const mnemonicWords = mnemonic ? mnemonic.split(' ') : [];

  return (
    <div className="create-wallet">
      <h1>Create Wallet</h1>
      <button onClick={handleGenerateMnemonic}>Generate Mnemonic</button>
      <div className="mnemonic-grid">
        {mnemonicWords.map((word, index) => (
          <div key={index} className="mnemonic-box">
            <span>{index + 1}</span>. {word}
          </div>
        ))}
      </div>
      {mnemonic && (
        <>
          <SolanaWallet mnemonic={mnemonic} onAddWallet={handleAddSolanaWallet} />
          <EthWallet mnemonic={mnemonic} onAddWallet={handleAddEthWallet} />
        </>
      )}
    </div>
  );
};

export default CreateWallet;