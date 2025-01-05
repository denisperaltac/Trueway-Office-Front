export function FormatMoneyUSD(amount: number, noFraction?: boolean) {
  if (isNaN(amount)) {
    return "-";
  }
  let fractionNumber = noFraction ? 0 : 2;

  const formattedAmount = Number(amount).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: fractionNumber,
    maximumFractionDigits: fractionNumber,
  });

  const formattedAmountWithSpace = formattedAmount.replace("$", "$ ");

  return formattedAmountWithSpace;
}
