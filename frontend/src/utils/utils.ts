export function trimWalletAddress(
  address: string,
  charsToShow: number = 6,
  charWhereToSplit: number = 3
): string {
  let prefix = address.substring(0, charsToShow);
  let suffix = address.substring(
    address.length - charWhereToSplit,
    address.length
  );
  return prefix + "..." + suffix;
}
