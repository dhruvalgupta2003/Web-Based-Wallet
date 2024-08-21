import { useMemo } from "react";
import { Link } from "react-router-dom";
import { WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { clusterApiUrl } from "@solana/web3.js";
import {
    LedgerWalletAdapter,
    PhantomWalletAdapter,
    SolflareWalletAdapter,
    TorusWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import "./Navbar.css";
import "@solana/wallet-adapter-react-ui/styles.css";

const Navbar = () => {
  // The network can be set 'devnet', 'testnet', or 'mainnet'
  const network = WalletAdapterNetwork.Devnet;
  // We can also provide a custom RPC endpoint
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(() => [
      new LedgerWalletAdapter(),
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter({ network }),
      new TorusWalletAdapter(),
  ], [network]);

  return (
      <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={wallets} autoConnect>
              <nav className="navbar">
                  <ul>
                      <li>
                          <Link to="/">Home</Link>
                      </li>
                      <li>
                          <Link to="/create-wallet">Create Wallet</Link>
                      </li>
                      <li>
                          <Link to="/wallet-list">Go To Wallet</Link>
                      </li>
                      <li>
                          <Link to="/create-transaction">Create Transaction</Link>
                      </li>
                  </ul>
                  <div className="auth-buttons">
                    <WalletModalProvider>
                      <WalletMultiButton />
                    </WalletModalProvider>
                  </div>
              </nav>
          </WalletProvider>
      </ConnectionProvider>
  );
};

export default Navbar;
