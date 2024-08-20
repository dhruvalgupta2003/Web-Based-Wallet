import React,{ FC, ReactNode, useMemo, useCallback, useState } from 'react'
import { WalletAdapterNetwork, WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider, useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton, WalletDisconnectButton } from '@solana/wallet-adapter-react-ui';
// import { Button } from '@solana/wallet-adapter-react-ui/lib/types/Button'
import {
    LedgerWalletAdapter,
    PhantomWalletAdapter,
    SolflareWalletAdapter,
    TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets'
import { clusterApiUrl, Transaction, SystemProgram, Keypair, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import "./ConnectWallet.css"
import '@solana/wallet-adapter-react-ui/styles.css';


const ConnectWallet:FC = () => {
    // The network can be set 'devnet', 'testnet' or 'mainnet'
    const network = WalletAdapterNetwork.Devnet;
    // We can also provide a custom RPC endpoint
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);
    const wallets = useMemo( () => [
        new LedgerWalletAdapter(),
        new PhantomWalletAdapter(),
        new SolflareWalletAdapter({ network }),
        new TorusWalletAdapter(),
    ], [network])

    return(
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    <WalletMultiButton />
                    <WalletDisconnectButton />
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider> 
    )
}

export default ConnectWallet