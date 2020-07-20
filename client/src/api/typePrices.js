export default (prices) => {
  let res = [];
  prices = String(prices);
  for (let i = 0; i < Math.floor(prices.length / 3); i++)
    res.unshift(prices.slice(prices.length - i * 3 - 3, prices.length - i * 3));
  if (prices.length % 3 !== 0) res.unshift(prices.slice(0, prices.length % 3));

  return res.join(",") + " ";
};
