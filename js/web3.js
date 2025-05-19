// web3.js - Simplified wallet connection with focus on MetaMask

// Initialize Web3 with MetaMask
async function initWeb3() {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    try {
      // Request account access
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      return { success: true, accounts };
    } catch (error) {
      return { success: false, error: "User denied account access" };
    }
  } else if (window.web3) {
    // Legacy dapp browsers
    window.web3 = new Web3(window.web3.currentProvider);
    const accounts = await window.web3.eth.getAccounts();
    return { success: true, accounts };
  } else {
    return { success: false, error: "No Ethereum browser detected. Please install MetaMask!" };
  }
}

// Connect wallet (simplified to focus on MetaMask)
async function connectWallet(walletType) {
  // For MetaMask or other Ethereum wallets
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    try {
      // Request account access
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      
      // Add Lisk network if not already configured
      try {
        // First try to switch to Lisk network
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x7D1" }], // Example Lisk chain ID - you may need to update this
        });
      } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask
        if (switchError.code === 4902) {
          try {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: "0x7D1", // Example Lisk chain ID - you may need to update this
                  chainName: "Lisk Testnet",
                  nativeCurrency: {
                    name: "LISK",
                    symbol: "LSK",
                    decimals: 18,
                  },
                  rpcUrls: ["https://testnet-rpc.lisk.com"], // Replace with actual Lisk testnet RPC URL
                  blockExplorerUrls: ["https://testnet-explorer.lisk.com"], // Replace with actual Lisk testnet explorer
                },
              ],
            });
          } catch (addError) {
            return { success: false, error: "Failed to add Lisk network" };
          }
        } else {
          return { success: false, error: "Failed to switch to Lisk network" };
        }
      }

      return {
        success: true,
        account: accounts[0],
        shortAccount: `${accounts[0].substring(0, 6)}...${accounts[0].substring(38)}`,
      };
    } catch (error) {
      return { success: false, error: "User denied account access" };
    }
  } else {
    return { success: false, error: "MetaMask not detected. Please install MetaMask!" };
  }
}

// Disconnect wallet
function disconnectWallet() {
  // For MetaMask, we don't actually disconnect, just clear our state
  return { success: true };
}

// Export functions
window.walletUtils = {
  connectWallet,
  initWeb3,
  disconnectWallet,
};