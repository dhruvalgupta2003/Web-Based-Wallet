import { generateMnemonic } from 'bip39';
import { useState } from 'react';
import SolanaWallet from '../wallets/SolanaWallet';
import EthWallet from '../wallets/EthWallet';
import './CreateWallet.css';

const CreateWallet = () => {
  const [mnemonic, setMnemonic] = useState<string>('');

  const handleGenerateMnemonic = async () => {
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
          <SolanaWallet mnemonic={mnemonic} />
          <EthWallet mnemonic={mnemonic} />
        </>
      )}
    </div>
  );
};

export default CreateWallet;
