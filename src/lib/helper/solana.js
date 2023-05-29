import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";
import { programs } from "@metaplex/js";
import axios from "axios";
import { config } from "./config.js";

const rpcEndpoint = config.rpcEndpoint || clusterApiUrl("mainnet-beta");

export const getConnection = (endpoint, commitment) => new Connection(endpoint, commitment);

export const mainnetConn = getConnection(rpcEndpoint, "confirmed");

export const toPublicKey = addr => new PublicKey(addr);

export const shortenAddress = (addr, limit = 6) =>
  `${addr.slice(0, limit)}...${addr.slice(-limit)}`;

export const getAccountSignatures = async (conn, addr, option) => {
  return (await conn.getSignaturesForAddress(toPublicKey(addr), option)) || [];
};

export const getParsedTransaction = async (conn, signature) => {
  const txn = await conn.getParsedTransaction(signature, { maxSupportedTransactionVersion: 2 });
  if (txn?.meta && txn?.meta?.err === null) return txn;
  return null;
};

export const getNFTMetadata = async (conn, mintAddr) => {
  const {
    metadata: { Metadata }
  } = programs;

  const metadataPDA = await Metadata.getPDA(mintAddr);
  const onChain = (await Metadata.load(conn, metadataPDA)).data;

  let offChain = {};
  if (onChain && onChain.data?.uri)
    offChain = await axios.get(onChain.data.uri).then(res => res.data);

  return {
    onChain,
    offChain
  };
};
