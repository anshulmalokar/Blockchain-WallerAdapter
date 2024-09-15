import React, { useEffect, useState } from 'react'
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

type Props = {}

export default function ShowSolBalance({}: Props) {
  const {connection} = useConnection();
  const wallet = useWallet();
  const [balance,setBalance] = useState<number>(0);

  async function getBalance(){
    if(wallet.publicKey){
        const balance = await connection.getBalance(wallet.publicKey);
        setBalance(balance);
    }
  }
  getBalance();
  
  return (
    <>
        <p>SOL Balance:</p> <div id="balance">
            {balance/LAMPORTS_PER_SOL} SOL
        </div>
    </>
  )
}