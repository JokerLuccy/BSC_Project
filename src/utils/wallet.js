import tp from "tp-js-sdk";
import { ethers } from "ethers";
import { usdtAddress } from "../config/constants";
import usdtABI from "../config/abi";
function isWhichPlat() {
  return tp.isConnected();
}
async function getWalletAddress() {
  return await tp.getWallet({
    walletTypes: ["bsc"],
    switch: false,
  });
}
function _signer() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  return signer;
}
class BSC {
  async getBnBalance(address) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const balance = await provider.getBalance(address);
    return Number(ethers.utils.formatEther(balance));
  }
  async getUsdtBalance(address) {
    const signer = _signer();
    const contract = new ethers.Contract(usdtAddress, usdtABI, signer);
    const balance = await contract.balanceOf(address);
    return Number(ethers.utils.formatEther(balance));
  }
  async transferUsdt(toAddress, amount) {
    try {
      const signer = _signer();
      const contract = new ethers.Contract(usdtAddress, usdtABI, signer);
      const tx = await contract.transfer(
        toAddress,
        ethers.utils.parseEther("" + amount)
      );
      const _wait = tx.wait(1);
      return _wait;
    } catch (error) {
      return false;
    }
  }
}
export { isWhichPlat, getWalletAddress, BSC };
