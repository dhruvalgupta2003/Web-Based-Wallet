import { useState } from 'react';
import { mnemonicToSeed } from 'bip39';
import { Wallet, HDNodeWallet } from 'ethers';
import './Wallet.css';

const EthWallet = ({ mnemonic }: { mnemonic: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [addresses, setAddresses] = useState<string[]>([]);

  const addWallet = async () => {
    const seed = await mnemonicToSeed(mnemonic);
    // const hexSeed = Buffer.from(seed).toString('hex'); // Convert the seed to a hex string
    const path = `m/44'/60'/${currentIndex}'/0'`;
    const hdNode = HDNodeWallet.fromSeed(seed);
    const child = hdNode.derivePath(path);
    const wallet = new Wallet(child.privateKey);
    setCurrentIndex(currentIndex + 1);
    setAddresses([...addresses, wallet.address]);
  };

  return (
    <div className="wallet">
      <h2>Ethereum Wallets</h2>
      <button onClick={addWallet}>Add Wallet</button>
      <div className="keys-grid">
        {addresses.map((address, index) => (
          <div key={index} className="key-box">
            {address}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EthWallet;
