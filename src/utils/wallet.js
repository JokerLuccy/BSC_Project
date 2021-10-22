import tp from "tp-js-sdk";
function isWhichPlat() {
  return tp.isConnected();
}
async function getWalletAddress() {
  return await tp.getWallet({
    walletTypes: ["bsc"],
    switch: false,
  });
}
export { isWhichPlat, getWalletAddress };
