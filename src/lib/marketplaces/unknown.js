import { NFTMarketplace } from "./marketplace.js";

const unknown = new NFTMarketplace({
  name: "Unknown",
  programId: [],
  favicon: "https://solana.com/apple-touch-icon.png",
  tokenBaseURL: "https://xray.helius.xyz/tx/"
});

unknown.isMarketSale = _ => true;

export default unknown;
