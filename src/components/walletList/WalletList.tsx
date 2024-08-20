import { Link } from 'react-router-dom';
import './WalletList.css';

interface WalletListProps {
    solanaWallets: string[];
    ethWallets: string[] ;
}

const WalletList: React.FC<WalletListProps>= ({ solanaWallets, ethWallets }) => {
    return (
        <div className="wallet-list">
            <h2>Solana Wallets</h2>
            <ul>
                {solanaWallets.map((wallet, index) => (
                    <li key={`solana-${index}`}>
                        <Link to={`/wallet-balance`} state={{publicKey: wallet, currency: 'SOL'}}>
                            {wallet.slice(0,10)}...{wallet.slice(-10)}
                        </Link>
                    </li>
                ))}
            </ul>

            <h2>Ethereum Wallets</h2>
            <ul>
                {ethWallets.map((wallet, index) => (
                    <li key={`eth-${index}`}>
                        <Link to={`/wallet-balance`} state={{publicKey: wallet, currency: 'ETH'}}>
                            {wallet.slice(0,10)}...{wallet.slice(-10)}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default WalletList;