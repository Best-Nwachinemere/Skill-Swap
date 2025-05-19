// main.js - Main application logic for SkillSwap

/**
 * Global variables
 */
let isConnected = false;
let currentAccount = null;

/**
 * DOM Elements - Get all the elements we need to interact with
 */
const header = document.getElementById("header");
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const nav = document.getElementById("nav");
const connectWalletBtn = document.getElementById("connect-wallet-btn");
const disconnectWalletBtn = document.getElementById("disconnect-wallet-btn");
const walletModal = document.getElementById("wallet-modal");
const walletModalClose = document.getElementById("wallet-modal-close");
const walletOptions = document.querySelectorAll(".wallet-option");
const notification = document.getElementById("notification");
const notificationClose = document.getElementById("notification-close");
const darkModeToggle = document.getElementById("dark-mode-toggle");
const auctionsGrid = document.getElementById("auctions-grid");

/**
 * Initialize the application when the DOM is loaded
 */
document.addEventListener("DOMContentLoaded", async () => {
  console.log("SkillSwap application initializing...");
  
  // Apply dark mode if enabled
  initDarkMode();
  
  // Add scroll event listener for header
  initScrollHeader();
  
  // Initialize animation on scroll
  initAnimationOnScroll();
  
  // Check if wallet was previously connected
  await checkWalletConnection();
  
  // Update wallet buttons visibility
  updateWalletButtons();
});

/**
 * Initialize dark mode based on user preference
 */
function initDarkMode() {
  const isDarkMode = localStorage.getItem("darkMode") === "true";
  if (isDarkMode) {
    document.body.classList.add("dark-mode");
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }
}

/**
 * Initialize header scroll effect
 */
function initScrollHeader() {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

/**
 * Check if wallet was previously connected and restore connection
 */
async function checkWalletConnection() {
  const walletConnected = localStorage.getItem('walletConnected') === 'true';
  const walletAccount = localStorage.getItem('walletAccount');
  
  if (walletConnected && walletAccount) {
    console.log("Restoring previous wallet connection...");
    
    // Update state
    isConnected = true;
    currentAccount = walletAccount;
    
    // Update UI
    connectWalletBtn.textContent = formatAddress(walletAccount);
    
    // Try to load real auctions
    loadRealAuctions();
  } else {
    console.log("No previous wallet connection found, loading sample data...");
    // Load sample auctions if not connected
    loadSampleAuctions();
  }
}

/**
 * Format an address to show only first and last few characters
 */
function formatAddress(address) {
  if (!address) return "";
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
}

/**
 * Update wallet buttons visibility based on connection state
 */
function updateWalletButtons() {
  if (isConnected) {
    if (disconnectWalletBtn) {
      connectWalletBtn.style.display = "none";
      disconnectWalletBtn.style.display = "inline-block";
    }
  } else {
    if (disconnectWalletBtn) {
      connectWalletBtn.style.display = "inline-block";
      disconnectWalletBtn.style.display = "none";
    }
  }
}

/**
 * Mobile menu toggle
 */
if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener("click", () => {
    nav.classList.toggle("active");
  });
}

/**
 * Connect wallet button
 */
if (connectWalletBtn) {
  connectWalletBtn.addEventListener("click", () => {
    walletModal.classList.add("active");
  });
}

/**
 * Disconnect wallet button
 */
if (disconnectWalletBtn) {
  disconnectWalletBtn.addEventListener("click", () => {
    disconnectWallet();
  });
}

/**
 * Disconnect the wallet and reset state
 */
function disconnectWallet() {
  // Call wallet disconnect function
  window.walletUtils.disconnectWallet();
  
  // Update state
  isConnected = false;
  currentAccount = null;
  
  // Clear localStorage
  localStorage.removeItem('walletConnected');
  localStorage.removeItem('walletAccount');
  localStorage.removeItem('walletType');
  
  // Update UI
  connectWalletBtn.textContent = "Connect Wallet";
  updateWalletButtons();
  
  // Show notification
  showNotification("success", "Wallet Disconnected", "Your wallet has been disconnected.");
  
  // Load sample auctions
  loadSampleAuctions();
}

/**
 * Close wallet modal
 */
if (walletModalClose) {
  walletModalClose.addEventListener("click", () => {
    walletModal.classList.remove("active");
  });
}

/**
 * Wallet options click handlers
 */
walletOptions.forEach((option) => {
  option.addEventListener("click", async function () {
    const walletType = this.getAttribute("data-wallet");
    
    // Store original content to restore if needed
    const originalContent = this.innerHTML;
    
    // Show connecting feedback
    this.innerHTML = `<div class="connecting-spinner"></div><span>Connecting...</span>`;
    
    try {
      console.log(`Attempting to connect ${walletType} wallet...`);
      
      // Call the wallet connection function
      const result = await window.walletUtils.connectWallet(walletType);
      
      if (result.success) {
        // Update state
        isConnected = true;
        currentAccount = result.account;
        
        // Store wallet info in localStorage for persistence
        localStorage.setItem('walletConnected', 'true');
        localStorage.setItem('walletAccount', result.account);
        localStorage.setItem('walletType', walletType);
        
        // Update UI
        connectWalletBtn.textContent = result.shortAccount;
        updateWalletButtons();
        
        // Close modal
        walletModal.classList.remove("active");
        
        // Show notification
        showNotification("success", "Wallet Connected", "Your wallet has been connected successfully.");
        
        // Load real auctions
        loadRealAuctions();
      } else {
        // Reset the button content
        this.innerHTML = originalContent;
        
        // Show error notification
        showNotification("error", "Connection Failed", result.error);
      }
    } catch (error) {
      console.error("Wallet connection error:", error);
      
      // Reset the button content on error
      this.innerHTML = originalContent;
      
      // Show error notification
      showNotification(
        "error",
        "Connection Error",
        "An error occurred while connecting. Please try again."
      );
    }
  });
});

/**
 * Close notification
 */
if (notificationClose) {
  notificationClose.addEventListener("click", () => {
    notification.classList.remove("active");
  });
}

/**
 * Show a notification to the user
 */
function showNotification(type, title, message) {
  const notificationIcon = notification.querySelector(".notification-icon i");
  const notificationTitle = notification.querySelector(".notification-title");
  const notificationDescription = notification.querySelector(".notification-description");
  
  // Set notification type
  notification.className = "notification";
  notification.classList.add(`notification-${type}`);
  
  // Set icon based on type
  if (type === "success") {
    notificationIcon.className = "fas fa-check-circle";
  } else if (type === "error") {
    notificationIcon.className = "fas fa-times-circle";
  } else if (type === "warning") {
    notificationIcon.className = "fas fa-exclamation-circle";
  } else if (type === "info") {
    notificationIcon.className = "fas fa-info-circle";
  }
  
  // Set content
  notificationTitle.textContent = title;
  notificationDescription.textContent = message;
  
  // Show notification
  notification.classList.add("active");
  
  // Auto hide after 5 seconds
  setTimeout(() => {
    notification.classList.remove("active");
  }, 5000);
}

/**
 * Dark mode toggle
 */
if (darkModeToggle) {
  darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDarkMode = document.body.classList.contains("dark-mode");
    localStorage.setItem("darkMode", isDarkMode);
    
    if (isDarkMode) {
      darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
      darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
  });
}

/**
 * Load real auctions from the contract
 */
async function loadRealAuctions() {
  if (!isConnected) {
    console.log("Not connected to wallet, loading sample auctions instead");
    loadSampleAuctions();
    return;
  }
  
  try {
    console.log("Loading real auctions from contract...");
    const result = await window.contractUtils.getAuctions();
    
    if (result.success) {
      console.log(`Successfully loaded ${result.auctions.length} auctions`);
      displayAuctions(result.auctions);
    } else {
      console.error("Failed to load auctions:", result.error);
      showNotification("error", "Failed to Load Auctions", result.error);
      loadSampleAuctions();
    }
  } catch (error) {
    console.error("Error loading auctions:", error);
    showNotification("error", "Error", "Failed to load auctions. Loading samples instead.");
    loadSampleAuctions();
  }
}

/**
 * Format LSK value with 4 decimal places
 */
function formatLsk(value) {
  if (!value) return "0";
  return Number.parseFloat(value).toFixed(4);
}

/**
 * Display auctions in the UI
 */
function displayAuctions(auctions) {
  if (!auctionsGrid) return;
  
  auctionsGrid.innerHTML = "";
  
  if (auctions.length === 0) {
    auctionsGrid.innerHTML = `
      <div class="no-auctions" style="text-align: center; grid-column: 1 / -1; padding: 3rem;">
        <i class="fas fa-search" style="font-size: 3rem; color: var(--text-light); margin-bottom: 1rem;"></i>
        <h3>No Auctions Found</h3>
        <p>There are currently no auctions available. Be the first to post a gig!</p>
        <a href="post-gig.html" class="btn btn-primary" style="margin-top: 1rem;">Post a Gig</a>
      </div>
    `;
    return;
  }
  
  auctions.forEach((auction) => {
    const timeLeft = getTimeLeft(auction.endTime);
    const auctionElement = document.createElement("div");
    auctionElement.className = "auction-card animate";
    
    // Parse skill description
    const { title, description, category } = parseSkillDescription(auction.skillDescription);
    
    // Default image based on category
    let image = "assets/images/auction1.jpg";
    if (category.toLowerCase().includes("develop")) {
      image = "assets/images/auction2.jpg";
    } else if (category.toLowerCase().includes("writ")) {
      image = "assets/images/auction3.jpg";
    } else if (category.toLowerCase().includes("market")) {
      image = "assets/images/auction4.jpg";
    }
    
    auctionElement.innerHTML = `
      <div class="auction-badge">${category}</div>
      <div class="auction-image">
        <img src="${image}" alt="${title}">
      </div>
      <div class="auction-content">
        <h3 class="auction-title">${title}</h3>
        <p class="auction-description">${description}</p>
        <div class="auction-meta">
          <div class="auction-price">${auction.highestBid > 0 ? formatLsk(auction.highestBid) : formatLsk(auction.minBid)} LSK</div>
          <div class="auction-time"><i class="far fa-clock"></i> ${timeLeft}</div>
        </div>
        <div class="auction-bidder">
          <div class="bidder-avatar">
            <img src="assets/images/avatar1.jpg" alt="Bidder Avatar">
          </div>
          <div class="bidder-name">Highest Bidder: ${auction.highestBidder !== "0x0000000000000000000000000000000000000000" ? formatAddress(auction.highestBidder) : "No bids yet"}</div>
        </div>
        <div class="auction-actions">
          <button class="btn btn-primary bid-btn" data-id="${auction.id}" data-min="${auction.highestBid > 0 ? auction.highestBid : auction.minBid}">Place Bid</button>
          <button class="btn btn-secondary details-btn" data-id="${auction.id}">Details</button>
        </div>
      </div>
    `;
    
    auctionsGrid.appendChild(auctionElement);
  });
  
  // Add event listeners to bid buttons
  addBidButtonListeners();
  
  // Add event listeners to details buttons
  addDetailsButtonListeners();
}

/**
 * Add event listeners to bid buttons
 */
function addBidButtonListeners() {
  document.querySelectorAll(".bid-btn").forEach((btn) => {
    btn.addEventListener("click", async function () {
      const auctionId = this.getAttribute("data-id");
      const minBid = Number.parseFloat(this.getAttribute("data-min"));
      
      if (!isConnected) {
        showNotification("warning", "Wallet Required", "Please connect your wallet to place a bid.");
        walletModal.classList.add("active");
        return;
      }
      
      const bidAmount = prompt(
        `Enter bid amount (min ${formatLsk(minBid)} LSK):`,
        formatLsk(minBid * 1.1)
      );
      
      if (bidAmount === null) return;
      
      if (Number.parseFloat(bidAmount) <= minBid) {
        showNotification(
          "error",
          "Bid Too Low",
          `Your bid must be higher than ${formatLsk(minBid)} LSK.`
        );
        return;
      }
      
      // Show bidding in progress
      this.disabled = true;
      this.innerHTML = '<div class="connecting-spinner"></div> Bidding...';
      
      try {
        const result = await window.contractUtils.placeBid(auctionId, bidAmount, currentAccount);
        
        if (result.success) {
          showNotification(
            "success",
            "Bid Placed",
            `Your bid of ${bidAmount} LSK has been placed successfully.`
          );
          // Reload auctions after a short delay
          setTimeout(loadRealAuctions, 2000);
        } else {
          showNotification("error", "Bid Failed", result.error);
          // Reset button
          this.disabled = false;
          this.innerHTML = 'Place Bid';
        }
      } catch (error) {
        console.error("Error placing bid:", error);
        showNotification("error", "Error", "An error occurred while placing your bid.");
        // Reset button
        this.disabled = false;
        this.innerHTML = 'Place Bid';
      }
    });
  });
}

/**
 * Add event listeners to details buttons
 */
function addDetailsButtonListeners() {
  document.querySelectorAll(".details-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const auctionId = this.getAttribute("data-id");
      window.location.href = `auctions.html?id=${auctionId}`;
    });
  });
}

/**
 * Load sample auctions for demonstration
 */
function loadSampleAuctions() {
  console.log("Loading sample auctions...");
  
  const sampleAuctions = [
    {
      id: 1,
      seller: "0x1234567890123456789012345678901234567890",
      skillDescription:
        "Professional Logo Design|I will create a modern, unique logo for your brand with unlimited revisions.|Design",
      minBid: 0.05,
      highestBid: 0.08,
      highestBidder: "0x1234567890123456789012345678901234567890",
      endTime: Date.now() + 86400000, // 24 hours from now
      settled: false,
      paidOut: false,
    },
    {
      id: 2,
      seller: "0x2345678901234567890123456789012345678901",
      skillDescription:
        "Website Development|Full-stack web development with React and Node.js. Responsive design included.|Development",
      minBid: 0.2,
      highestBid: 0.25,
      highestBidder: "0x3456789012345678901234567890123456789012",
      endTime: Date.now() + 172800000, // 48 hours from now
      settled: false,
      paidOut: false,
    },
    {
      id: 3,
      seller: "0x4567890123456789012345678901234567890123",
      skillDescription:
        "Content Writing|SEO-optimized blog posts and articles for your website or social media.|Writing",
      minBid: 0.03,
      highestBid: 0.04,
      highestBidder: "0x5678901234567890123456789012345678901234",
      endTime: Date.now() + 129600000, // 36 hours from now
      settled: false,
      paidOut: false,
    },
    {
      id: 4,
      seller: "0x6789012345678901234567890123456789012345",
      skillDescription:
        "Social Media Management|Complete social media management for 1 week including content creation and engagement.|Marketing",
      minBid: 0.1,
      highestBid: 0.12,
      highestBidder: "0x7890123456789012345678901234567890123456",
      endTime: Date.now() + 259200000, // 72 hours from now
      settled: false,
      paidOut: false,
    },
  ];
  
  displayAuctions(sampleAuctions);
}

/**
 * Initialize animation on scroll
 */
function initAnimationOnScroll() {
  const animateElements = document.querySelectorAll(".animate");
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.1 }
  );
  
  animateElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    observer.observe(element);
  });
}

/**
 * Get time left until auction end
 */
function getTimeLeft(endTime) {
  const now = Date.now();
  const timeLeft = endTime - now;
  
  if (timeLeft <= 0) return "Ended";
  
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  
  if (days > 0) {
    return `${days}d ${hours}h left`;
  }
  
  return `${hours}h ${minutes}m left`;
}

/**
 * Parse skill description
 */
function parseSkillDescription(description) {
  if (!description) return { title: "Skill Auction", description: "No description provided", category: "Service" };
  
  const parts = description.split("|");
  
  return {
    title: parts[0] ? parts[0].trim() : "Skill Auction",
    description: parts[1] ? parts[1].trim() : description,
    category: parts[2] ? parts[2].trim() : "Service",
  };
}

// Export utility functions to global scope
window.utils = {
  getTimeLeft,
  showNotification,
  formatAddress,
  formatLsk,
  parseSkillDescription,
};