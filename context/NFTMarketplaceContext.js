import React, { useState, useContext, useEffect } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import Router from "next/router";
import axios from "axios";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { useRouter } from "next/router";

//To Upload Image to IPFS
const projectId = "2MauvFb4bdAX1kYiAxSHGfEf2hi";
const projectSecretKey = "c5f6dac4cf3a9daa572297b1537ba802";
const auth =
  "Basic " + Buffer.from(projectId + ":" + projectSecretKey).toString("base64");
const subdomain = "https://austin-nft-marketplace.infura-ipfs.io";

const client = ipfsHttpClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

//INTERNAL IMPORT
import { NftMarketplaceAddress, NftMarketplaceABI } from "./constant";

// ----FETCHING OR GETTING SMART CONTRACT USING ETHERS.JS
const fetchContract = (signerorProvider) =>
  new ethers.Contract(
    NftMarketplaceAddress,
    NftMarketplaceABI,
    signerorProvider
  );

//----CONNECTING WITH SMART CONTRACT
const connectingWithSmartContract = async () => {
  try {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchContract(signer);
    return contract;
  } catch (error) {
    console.log("Something went wrong while connecting with contract");
  }
};

// Creating context to managing data
export const NFTMarketplaceContext = React.createContext();

//-----------------------------Sending data to all components---------------------------//
export const NFTMarketplaceProvider = ({ children }) => {
  //const titleData = "Discover, collect, and sell NFTs";
  const titleData = "Global Trading Platform for Carbon Credits";
  const [currentAccount, setCurrentAccount] = useState("");
  const router = useRouter();

  // -----Check If Wallet Is Connected
  const checkWalletIsConnected = async () => {
    try {
      if (!window.ethereum)
        return setOpenError(true), setError("Install MetaMask");
      //----CHECK IF THERE IS ANY ACCOUNT
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      } else {
        console.log("No Account Found");
      }
    } catch (error) {
      console.log(`error is ${error}`);
    }
  };

  useEffect(() => {
    checkWalletIsConnected();
  }, []);

  // -----CONNECT WALLET FUNCTION
  const connectWallet = async () => {
    try {
      if (!window.ethereum)
        return setOpenError(true), setError("Install MetaMask");
      //----REQUEST WALLET
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
      // window.location.reload();
    } catch (error) {
      console.log("Error While Connecting Wallet");
    }
  };

  // ----UPLOAD IMAGES TO IPFS
  const uploadToIPFS = async (file) => {
    try {
      const added = await client.add({ content: file });
      const url = `${subdomain}/ipfs/${added.path}`;
      console.log(`IPFS Image URL ${url}`);
      return url;
    } catch (error) {
      console.log("Error Uploading to IPFS", error);
    }
  };

  // ----CREATE NFT & UPLOAD METADATA TO IPFS
  const createNFT = async (name, price, image, description, router) => {
    if (!name || !description || !price || !image)
      return console.log("Missing Data");

    //Convert data into JSON format
    const data = JSON.stringify({ name, description, image });

    try {
      const added = await client.add(data);
      //const url = `https://infura.ipfs.io/ipfs/${added.path}`;
      const url = `${subdomain}/ipfs/${added.path}`;
      await createSale(url, price);
      router.push("/searchPage");
    } catch (error) {
      console.log(error);
    }
  };

  // ------INTERNAL FUNCTION TO CREATE NFT SALE
  const createSale = async (url, formInputPrice, isReselling, id) => {
    try {
      const price = ethers.utils.parseUnits(formInputPrice, "ether");

      const contract = await connectingWithSmartContract();

      const listingPrice = await contract.getListingPrice();

      // --CREATE NFT
      const transaction = !isReselling
        ? await contract.createToken(url, price, {
            value: listingPrice.toString(),
          })
        : await contract.resellToken(id, price, {
            value: listingPrice.toString(),
          });

      await transaction.wait();
      console.log(transaction);
      //router.push("/searchPage");
    } catch (error) {
      console.log(`Create sale error ${error}`);
    }
  };

  // ----FETCH ALL NFTs LISTED ON MARKETPLACE
  const fetchNFTS = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider();
      const contract = fetchContract(provider);

      const data = await contract.fetchMarketItems();

      // --Resolve the promise
      const items = await Promise.all(
        data.map(
          async ({ tokenId, seller, owner, price: unformattedPrice }) => {
            const tokenURI = await contract.tokenURI(tokenId);
            // console.log("tokenURI", tokenURI);

            const {
              data: { image, name, description },
            } = await axios(tokenURI);

            const price = ethers.utils.formatUnits(
              unformattedPrice.toString(),
              "ether"
            );

            return {
              price,
              tokenId: tokenId.toNumber(),
              seller,
              owner,
              image,
              name,
              description,
              tokenURI,
            };
          }
        )
      );
      return items;
    } catch (error) {
      console.log(`Fectching NFT error${error}`);
    }
  };

  useEffect(() => {
    fetchNFTS();
  }, []);

  // ----FETCHING MY NFTs or MY LISTED NFTs
  const fetchMyNFTsOrListedNFTs = async (type) => {
    try {
      const contract = await connectingWithSmartContract();

      const data =
        type == "fetchItemsListed"
          ? await contract.fetchItemsListed()
          : await contract.fetchMyNFTs();

      const items = await Promise.all(
        data.map(
          async ({ tokenId, seller, owner, price: unformattedPrice }) => {
            const tokenURI = await contract.tokenURI(tokenId);
            const {
              data: { image, name, description },
            } = await axios.get(tokenURI);
            const price = ethers.utils.formatUnits(
              unformattedPrice.toString(),
              "ether"
            );

            return {
              price,
              tokenId: tokenId.toNumber(),
              seller,
              owner,
              image,
              name,
              description,
              tokenURI,
            };
          }
        )
      );
      return items;
    } catch (error) {
      console.log(`Error while fetchMyNFTorListedNFT ${error}`);
    }
  };

  useEffect(() => {
    fetchMyNFTsOrListedNFTs();
  }, []);

  // ----BUY NFT FUNCTION
  const buyNFT = async (nft) => {
    try {
      const contract = await connectingWithSmartContract();

      const price = ethers.utils.parseUnits(nft.price.toString(), "ether");

      const transaction = await contract.createMarketSale(nft.tokenId, {
        value: price,
      });

      await transaction.wait();
      router.push("/author");
    } catch (error) {
      console.log(`Error buy NFT ${error}`);
    }
  };

  return (
    <NFTMarketplaceContext.Provider
      value={{
        checkWalletIsConnected,
        connectWallet,
        uploadToIPFS,
        createNFT,
        createSale,
        fetchNFTS,
        fetchMyNFTsOrListedNFTs,
        buyNFT,
        currentAccount,
        titleData,
      }}
    >
      {children}
    </NFTMarketplaceContext.Provider>
  );
};
