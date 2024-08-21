import React, { useState,useEffect } from 'react';
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
  console.log(mnemonic);

  useEffect(() => {
    // Retrieve the menmoic from localstorage when the component mounts
    const storedMnemoic = localStorage.getItem('mnemonic');
    if(storedMnemoic){
      setMnemonic(storedMnemoic)
    }
  },[])
  

  const handleAddSolanaWallet = (publicKey: string) => {
    setSolanaWallets(prevWallets => [...prevWallets, publicKey]);
  };

  const handleAddEthWallet = (address: string) => {
    setEthWallets(prevWallets => [...prevWallets, address]);
  };

  const handleGenerateMnemonic = () => {
    if(!mnemonic){
      const phrase = generateMnemonic();
      setMnemonic(phrase);
      // store the mnemonic in localstorage
      localStorage.setItem('mnemonic',phrase);
    } 
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