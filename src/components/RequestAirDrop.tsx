import { useWallet } from "@solana/wallet-adapter-react";
import { useConnection } from "@solana/wallet-adapter-react";
import { useState } from "react";

type Props = {}

export default function RequestAirDrop({}: Props) {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [sol,setSol] = useState<string>("0");

  const requestAirDrop = async() => {
    if(wallet.publicKey && parseInt(sol) > 0){
        const data = await connection.requestAirdrop(wallet.publicKey,parseInt(sol));
        if(data){
            alert("Airdrop requested successfully");
        }else{
            alert("Failed to request airdrop");
        }
        setSol('0');
    }
  }

  return (
    <>
        <div>
            <input type="text" name="" id="" onChange={(e: React.ChangeEvent<HTMLInputElement>) =>{
                setSol(e.target.value);
            }} placeholder="Set required Sol"/>
            <br />
            <button onClick={() => {requestAirDrop()}}>
                Request Airdrop
            </button>
        </div> 
    </>
  )
}