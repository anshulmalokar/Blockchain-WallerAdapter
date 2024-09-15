import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { useState } from "react";

import { Buffer } from 'buffer';
type Props = {};

export default function SendTokens({}: Props) {
  // @ts-ignore
  window.Buffer = Buffer;
  const wallet = useWallet();
  const { connection } = useConnection();
  const [amount, setAmount] = useState(0);
  const [receiver, setReceiver] = useState<string>();

  const sendTransaction = async () => {
    console.log("called the send transactio button");
    const public_key = wallet.publicKey;
    const transaction = new Transaction();
    if (!public_key) {
      alert("Please connect your wallet");
    } else {
      if (receiver) {
        transaction.add(
          SystemProgram.transfer({
            fromPubkey: public_key,
            toPubkey: new PublicKey(receiver),
            lamports: amount * LAMPORTS_PER_SOL,
          })
        );
      }
    }
    const response = await wallet.sendTransaction(transaction,connection);
    if(response){
        alert("Transaction sent successfully");
    }else{
        alert("Transaction failed");
    }
  };

  return (
    <>
      <div>
        <input
          type="text"
          name=""
          id=""
          onChange={(e) => {
            setReceiver(e.target.value);
          }}
          placeholder="Enter the address to send the amount"
        />
        <input
          type="text"
          name=""
          id=""
          onChange={(e) => {
            setAmount(parseInt(e.target.value));
          }}
          placeholder="Enter the amount to be sent"
        />
        <button
          onClick={() => {
            sendTransaction();
          }}
        >
          Send Transaction
        </button>
      </div>
    </>
  );
}
