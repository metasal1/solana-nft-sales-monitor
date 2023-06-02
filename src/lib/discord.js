import axios from "axios";
import { shortenAddress } from "./helper/solana.js";

// List to store the signatures of the posts that have already been made
const postedSignatures = [];

export const postToDiscord = async (discordWebhook, salesData) => {
  const { date, collection, mint, buyer, seller, salesPrice, signature, transactionURL } =
    salesData;
  const { name: exchangeName, favicon } = salesData.exchange;
  const { name: nftName, image } = salesData.metadata.offChain;

  // Check if the current signature has already been posted
  if (postedSignatures.includes(signature)) {
    console.log("Post already made for signature:", signature);
    return; // Exit the function without making a new post
  }

  const payload = {
    embeds: [
      {
        author: {
          name: `${collection} Collection`
        },
        title: `${nftName} sold ${(salesPrice).toFixed(2)} S◎L`,
        url: transactionURL,
        timestamp: date,
        fields: [
          {
            name: "Price",
            value: `${salesPrice} S◎L`
          },
          {
            name: "Seller",
            value: shortenAddress(seller),
            inline: true
          },
          {
            name: "Buyer",
            value: shortenAddress(buyer),
            inline: true
          },
          {
            name: "Mint Token",
            value: mint,
            inline: true
          },
          {
            name: "Transaction ID",
            value: signature
          }
        ],
        thumbnail: {
          url: image
        },
        footer: {
          text: exchangeName,
          icon_url: favicon
        }
      }
    ]
  };

  return axios
    .post(discordWebhook, payload)
    .then(() => {
      // Add the current signature to the list of posted signatures
      postedSignatures.push(signature);
    })
    .catch(e => console.log("postToDiscord Error:", e, "\nSignature:", signature));
};
