NFT marketplace
如果有 cache 和 artifacts
删掉 cache 还有 artifacts, 还有 context 里面的 NFTMarketplace.json
当运行完 npx hardhat run scripts/deploy.js --network localhost 的时候需要把 artifacts/contracts/里面的 NFTMarketplace.json 挪到 context 里面
然后再运行 npm run dev
同时运行 1 和 2
1-npx hardhat node
2-npx hardhat run scripts/deploy.js --network localhost
3- npm run dev

deployed contract address to 0x5FbDB2315678afecb367f032d93F642f64180aa3
