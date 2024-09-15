import React, { useState } from 'react'
import { ed25519 } from '@noble/curves/ed25519';
import { useWallet } from '@solana/wallet-adapter-react';
import bs58 from 'bs58';

type Props = {}

export default function SignMessage({}: Props) {
 const [message,setMessage] = useState<string>();

 const {publicKey,signMessage} = useWallet();

 const signMessages = async () => {
    if(!publicKey){
        alert('Please connect your wallet');
        return;
    }
    if(!signMessage){
        alert('Please select a message to sign');
        return;
    }
    const encodedMessage = new TextEncoder().encode(message);
    const signature = await signMessage(encodedMessage);
    const response = ed25519.verify(
        signature,
        encodedMessage,
        publicKey.toBytes(),
    );
    if(!response){
        alert('Invalid signature'); 
        return;
    }
    alert(`Signature is valid ${bs58.encode(signature)}`);
 }

 return (
    <>
        <input type="text" name="" id="" placeholder='message' onChange={(e) => {
            setMessage(e.target.value);
        }}/>
        <button onClick={signMessages}>Sign Message</button>
    </>
  )
}