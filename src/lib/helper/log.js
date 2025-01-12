export const log = (...args) => console.log(...args);

export const logToConsole = salesData => {
  const { date, collection, salesPrice, signature } = salesData;
  const { name: exchangeName } = salesData.exchange;
  const { name: nftName } = salesData.metadata.offChain;


  log(`${(new Date).toLocaleString()},${date.toLocaleString()}, ${collection}, ${nftName}, ${(salesPrice).toFixed(2)} SOL, ${exchangeName}, ${signature.slice(0, 20) + '...'}`);
};
