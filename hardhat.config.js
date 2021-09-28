/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require('hardhat-deploy');
require("@nomiclabs/hardhat-ethers")

const fs = require('fs')
const mnemonic = fs.existsSync('./mnemonic') ? fs.readFileSync('mnemonic', 'utf-8').toString().replace("\r","").split("\n") : ''
if (!mnemonic) console.log('Missing mnemonic')

module.exports = {
  solidity: {
    compilers: [
      {
          version: '0.8.7',
          settings: {
              optimizer: {
                  enabled: true,
                  runs: 1000
              }
          }
      }
    ]
  },
  namedAccounts: {
    deployer: '0xB341844B93831df1aBe8705f0b8260eCFd8E5Ce7',
    tester: '0xaf5f7b7443a501740923F196FEDFf3F741c6583C'
  },
  defaultNetwork: "bsc_testnet",
  networks: {
    bsc_testnet: {
      url: 'https://data-seed-prebsc-1-s1.binance.org:8545',
      chainId: 97,
      accounts: mnemonic
    }
  },
  mocha: {
    timeout: 200000
  }
};
