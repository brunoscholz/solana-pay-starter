import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { clusterApiUrl, Connection, PublicKey, Transaction } from "@solana/web3.js";
import { createTransferCheckedInstruction, getAssociatedTokenAddress, getMint } from "@solana/spl-token";
import BigNumber from "bignumber.js";
import products from "./products.json";

const usdcAddress = new PublicKey("4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU");
const sellerAddress = 'ubqidAfbBj595FrTHSb1XJF39o6fg7BjefJYNTpgEcx'
const sellerPublicKey = new PublicKey(sellerAddress)

const createTransaction = async (req, res) => {
  try {
    // Extract the transaction data from the request body
    const { buyer, orderID, itemID } = req.body

    // If we don't have something we need, stop!
    if (!buyer) {
      return res.status(400).json({
        message: 'Missing buyer address'
      })
    }

    if (!orderID) {
      return res.status(400).json({
        message: 'Missing order ID'
      })
    }

    // Fetch item price from products.json using itemID
    const itemPrice = products.find(item => item.id === itemID).price

    if (!itemPrice) {
      return res.status(404).json({
        message: 'Item not found. please check item ID'
      })
    }

    const bigAmount = BigNumber(itemPrice);
    const buyerPublicKey = new PublicKey(buyer);

    const network = WalletAdapterNetwork.Devnet;
    const endpoint = clusterApiUrl(network);
    const connection = new Connection(endpoint);

    const buyerUsdcAddress = await getAssociatedTokenAddress(usdcAddress, buyerPublicKey);
    const shopUsdcAddress = await getAssociatedTokenAddress(usdcAddress, sellerPublicKey);
    const { blockhash } = await connection.getLatestBlockhash("finalized");

    const usdcMint = await getMint(connection, usdcAddress);

    // The first two things we need - a recent block ID
    // and the public key of the fee payer
    const tx = new Transaction({
      recentBlockhash: blockhash,
      feePayer: buyerPublicKey
    })

    // This is the "action" that the transaction will take
    // We're just going to transfer some SOL
    // const transferInstruction = SystemProgram.transfer({
    //   fromPubkey: buyerPublicKey,
    //   // Lamports are the smallest unit of SOL, like Gwei with Ethereum
    //   lamports: bigAmount.multipliedBy(LAMPORTS_PER_SOL).toNumber(),
    //   toPubkey: sellerPublicKey
    // })
    const transferInstruction = createTransferCheckedInstruction(
      buyerUsdcAddress,
      usdcAddress,     // This is the address of the token we want to transfer
      shopUsdcAddress,
      buyerPublicKey,
      bigAmount.toNumber() * 10 ** (await usdcMint).decimals,
      usdcMint.decimals // The token could have any number of decimals
    );

    transferInstruction.keys.push({
      pubkey: new PublicKey(orderID),
      isSigner: false,
      isWritable: false
    })

    tx.add(transferInstruction)

    // Formatting our transaction
    const serializedTransaction = tx.serialize({
      requireAllSignatures: false
    })
    const base64 = serializedTransaction.toString('base64')

    res.status(200).json({
      transaction: base64
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({ error: 'error creating tx' })
    return
  }
}

export default function handler(req, res) {
  if (req.method === 'POST') {
    createTransaction(req, res)
  } else {
    res.status(405).end()
  }
}
