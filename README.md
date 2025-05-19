# SkillSwap - Decentralized Freelance Marketplace

SkillSwap is a decentralized marketplace for freelance services where users can bid on skills they need. This platform leverages blockchain technology to create a transparent, secure, and efficient way to connect talent with clients.

## Features

- **Auction-Based Marketplace**: Post your skills as auctions and let clients bid for your services
- **Smart Contract Integration**: Secure transactions and agreements through blockchain technology
- **Wallet Integration**: Connect with MetaMask, WalletConnect, or Coinbase Wallet
- **User Dashboard**: Track your gigs, bids, won auctions, and earnings
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## Setup Instructions

1. **Clone the Repository**
   \`\`\`
   git clone https://github.com/yourusername/skillswap.git
   cd skillswap
   \`\`\`

2. **Update Contract Address**
   Open `js/contract.js` and update the `contractAddress` variable with your deployed contract address:
   \`\`\`javascript
   // Replace with your deployed contract address on LISK
   const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS";
   \`\`\`

3. **Set Up Web Server**
   You can use any web server to host the files. For a simple local server, you can use:
   
   - Python:
     \`\`\`
     python -m http.server 8000
     \`\`\`
   
   - Node.js (with http-server):
     \`\`\`
     npm install -g http-server
     http-server
     \`\`\`

4. **Access the Application**
   Open your browser and navigate to:
   \`\`\`
   http://localhost:8000
   \`\`\`

## Project Structure

\`\`\`
skillswap/
├── assets/
│   ├── images/
│   │   ├── logo.svg
│   │   ├── hero.jpg
│   │   ├── auction1.jpg
│   │   ├── auction2.jpg
│   │   ├── auction3.jpg
│   │   ├── auction4.jpg
│   │   ├── avatar1.jpg
│   │   ├── avatar2.jpg
│   │   ├── avatar3.jpg
│   │   ├── avatar4.jpg
│   │   ├── metamask.png
│   │   ├── walletconnect.png
│   │   └── coinbase.png
│   └── icons/
│       └── favicon.ico
├── css/
│   └── styles.css
├── js/
│   ├── main.js
│   ├── web3.js
│   ├── contract.js
│   └── utils.js
├── index.html
├── auctions.html
├── post-gig.html
├── dashboard.html
├── blog.html
├── contact.html
└── README.md
\`\`\`

## Smart Contract Integration

The application integrates with the SkillSwapAuction smart contract deployed on the LISK blockchain. The contract handles:

- Creating skill auctions
- Placing bids
- Settling auctions
- Processing payouts

## Customization

### Colors
You can customize the color scheme by modifying the CSS variables in `css/styles.css`:

\`\`\`css
:root {
    --primary: #d53f8c;
    --primary-light: #f8b4d9;
    --secondary: #805ad5;
    --secondary-light: #d6bcfa;
    --accent: #ed8936;
    --accent-light: #fbd38d;
    /* ... other variables ... */
}
\`\`\`

### Images
Replace the placeholder images in the `assets/images/` directory with your own images.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For any questions or support, please contact:
- Email: info@skillswap.com
- Twitter: [@SkillSwap](https://twitter.com/skillswap)
