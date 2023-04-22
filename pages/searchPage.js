import React, { useState, useEffect, useContext } from "react";

//INTRNAL IMPORT
import Style from "../styles/searchPage.module.css";
import { Slider, Brand } from "../components/ComponentIndex";
import { SearchBar } from "../SearchPage/searchBarIndex";
import { Filter, Loader } from "../components/ComponentIndex";
import { NFTCardTwo, Banner } from "../collectionPage/collectionIndex";
import images from "../img";

//SMART CONTRACT IMPORT
import { NFTMarketplaceContext } from "../context/NFTMarketplaceContext";

const searchPage = () => {
  const { fetchNFTS } = useContext(NFTMarketplaceContext);
  const [nfts, setNFTs] = useState([]);
  const [nftsCopys, setNftCopys] = useState([]);

  useEffect(() => {
    fetchNFTS().then((item) => {
      setNFTs(item.reverse());
      setNftCopys(item);
      console.log(nfts);
    });
  }, []);

  //Seacrh NFT Function
  const onHandleSearch = (value) => {
    const filteredNFTS = nfts.filter(({ name }) =>
      name.toLowerCase().includes(value.toLowerCase())
    );

    if (filteredNFTS.length == 0) {
      setNFTs(nftsCopys);
    } else {
      setNFTs(filteredNFTS);
    }
  };

  //Clear search NFT function
  const onClearSearch = () => {
    if (nfts.length && nftsCopys.length) {
      setNFTs(nftsCopys);
    }
  };

  // const collectionArray = [
  //   {
  //     image: images.nft_image_1,
  //     name: "NFT_IMAGE1",
  //     price: "00.1",
  //     seller: "seller",
  //     tokenId: "1",
  //     description: "",
  //     tokenURI: "",
  //     owner: "",
  //   },
  //   {
  //     image: images.nft_image_2,
  //     name: "NFT_IMAGE2",
  //     price: "1.4",
  //     seller: "seller",
  //     tokenId: "2",
  //     description: "",
  //     tokenURI: "",
  //     owner: "",
  //   },
  //   {
  //     image: images.creatorbackground6,
  //     name: "NFT_IMAGE3",
  //     price: "0.42",
  //     seller: "seller",
  //     tokenId: "2",
  //     description: "",
  //     tokenURI: "",
  //     owner: "",
  //   },
  //   {
  //     image: images.ai4,
  //     name: "NFT_IMAGE4",
  //     price: "0.28",
  //     seller: "seller",
  //     tokenId: "3",
  //     description: "",
  //     tokenURI: "",
  //     owner: "",
  //   },
  //   {
  //     image: images.animal,
  //     name: "NFT_IMAGE5",
  //     price: "4",
  //     seller: "seller",
  //     tokenId: "4",
  //     description: "",
  //     tokenURI: "",
  //     owner: "",
  //   },
  //   {
  //     image: images.bored2,
  //     name: "NFT_IMAGE6",
  //     price: "7",
  //     seller: "seller",
  //     tokenId: "5",
  //     description: "",
  //     tokenURI: "",
  //     owner: "",
  //   },
  //   {
  //     image: images.ai4,
  //     name: "NFT_IMAGE7",
  //     price: "2",
  //     seller: "seller",
  //     tokenId: "6",
  //     description: "",
  //     tokenURI: "",
  //     owner: "",
  //   },
  //   {
  //     image: images.founder4,
  //     name: "NFT_IMAGE8",
  //     price: "2.5",
  //     seller: "seller",
  //     tokenId: "7",
  //     description: "",
  //     tokenURI: "",
  //     owner: "",
  //   },
  // ];

  return (
    <div className={Style.searchPage}>
      <Banner bannerImage={images.creatorbackground2} />
      <SearchBar
        onHandleSearch={onHandleSearch}
        onClearSearch={onClearSearch}
      />
      <Filter />
      {/*如果NFT的数量为0 那么就显示这个Loader的gif image， 如果不等于0就显示NFT */}
      {nfts.length == 0 ? <Loader /> : <NFTCardTwo NFTData={nfts} />}
      <Slider />
      <Brand />
    </div>
  );
};

export default searchPage;
