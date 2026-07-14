export default function calcsale(price, sale) {
  const saleAmount = (price * sale) / 100;
  const discountedPrice = price - saleAmount;

  return discountedPrice;
}
