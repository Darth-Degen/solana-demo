import { PublicKey } from "@solana/web3.js";

export const truncatePubKey = (pubKey: PublicKey): string => 
   pubKey.toBase58().slice(0, 4) +
      "..." +
   pubKey.toBase58().slice(-4)
            
