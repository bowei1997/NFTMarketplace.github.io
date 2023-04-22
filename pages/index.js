import React, { useContext, useEffect, useState } from "react";
//INTENAL IMPORT
import Style from "../styles/index.module.css";

import {
  HeroSection,
  Service,
  BigNFTSlider,
  Subscribe,
  Title,
  Category,
  Filter,
  NFTCard,
  Collection,
  FollowerTab,
  AudioLive,
  Slider,
  Brand,
  Video,
  Loader,
} from "../components/ComponentIndex";
import { NFTMarketplaceContext } from "../context/NFTMarketplaceContext";

import { getTopCreators } from "../TopCreator/TopCreators";

const Home = () => {
  const { checkWalletIsConnected } = useContext(NFTMarketplaceContext);

  useEffect(() => {
    checkWalletIsConnected();
  }, []);

  const { fetchNFTS } = useContext(NFTMarketplaceContext);
  const [nfts, setNFTs] = useState([]);
  const [nftsCopys, setNftCopys] = useState([]);

  //CRATOR LIST
  const creators = getTopCreators(nfts);
  console.log(creators);

  useEffect(() => {
    fetchNFTS().then((item) => {
      setNFTs(item.reverse());
      setNftCopys(item);
      console.log(nfts);
    });
  }, []);

  return (
    <div className={Style.homePage}>
      <HeroSection />
      <Service />
      <BigNFTSlider />

      <Title
        heading="Audio Collection"
        paragraph="Discover the most outstanding NFTs in all topics of life."
      />
      <AudioLive />
      {creators.length == 0 ? (
        <Loader />
      ) : (
        <FollowerTab TopCreator={creators} />
      )}

      <Title
        heading="New Collection"
        paragraph="Discover the most oustanding NFTs in all topics of life."
      />

      <Slider />

      <Collection />

      <Title
        heading="Featured NFTs"
        paragraph="Discover the most oustanding NFTs in all topics of life."
      />
      <Filter />
      {nfts == 0 ? <Loader /> : <NFTCard NFTData={nfts} />}
      <Title
        heading="Browse by category"
        paragraph="Explore the NFTs in the most featured categories."
      />
      <Category />

      <Subscribe />
      <Brand />
      <Video />
    </div>
  );
};

export default Home;
