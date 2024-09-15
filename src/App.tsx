import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import { useMemo } from 'react';
import SendTokens from './components/SendTokens';
import ShowSolBalance from './components/ShowSolBalance';
import SignMessage from './components/SignMessage';
import RequestAirDrop from './components/RequestAirDrop';

function App() {
  const network = WalletAdapterNetwork.Devnet;

  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  return (
    <>
    <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={[]} autoConnect>
              <WalletModalProvider>
                <div style={{ display: 'flex', justifyContent: "space-between" }}>
                  <WalletMultiButton />
                  <WalletDisconnectButton />
                </div>
                <>
                  {/* <RequestAirDrop/> */}
                  {/* <ShowSolBalance /> */}
                  {/* <SendTokens /> */}
                  <SignMessage/>
                </>
              </WalletModalProvider>
          </WalletProvider>
      </ConnectionProvider>
    </>
  )
}

export default App
