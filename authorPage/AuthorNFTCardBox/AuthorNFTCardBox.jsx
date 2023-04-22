import React, { useState } from "react";

//INTERNAL IMPORT
import Style from "./AuthorNFTCardBox.module.css";
import images from "../../img";
import { NFTCardTwo } from "../../collectionPage/collectionIndex";
import FollowerTabCard from "../../components/FollowerTab/FollowerTabCard/FollowerTabCard";

const AuthorNFTCardBox = ({
  collectiables,
  created,
  like,
  follower,
  following,
  nfts,
  myNfts,
}) => {
  // const collectiablesArray = [
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

  // const createdArray = [
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

  // const likeArray = [
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

  const followerArray = [
    {
      background: images.founder3,
      user: images.user1,
      name: "Jackson Baker",
      seller: "",
    },
    {
      background: images.creatorbackground2,
      user: images.user2,
      name: "Giada Mann",
      seller: "",
    },
    {
      background: images.creatorbackground3,
      user: images.user10,
      name: "Easton Johnson",
      seller: "",
    },
    {
      background: images.founder4,
      user: images.user3,
      name: "Everly Williams",
      seller: "",
    },
    {
      background: images.cyber1,
      user: images.user4,
      name: "Sofia Brown",
      seller: "",
    },
    {
      background: images.creatorbackground6,
      user: images.user5,
      name: "Harrison Garcia",
      seller: "",
    },
    {
      background: images.ai4,
      user: images.user6,
      name: "Emma Jones",
      seller: "",
    },
    {
      background: images.ai1,
      user: images.user8,
      name: "Olivia Miller",
      seller: "",
    },
  ];

  const followingArray = [
    {
      background: images.creatorbackground3,
      user: images.user10,
      name: "Easton Johnson",
      seller: "",
    },
    {
      background: images.creatorbackground4,
      user: images.user3,
      name: "Everly Williams",
      seller: "",
    },

    {
      background: images.bored1,
      user: images.user6,
      name: "Emma Jones",
      seller: "",
    },
    {
      background: images.creatorbackground6,
      user: images.user8,
      name: "Olivia Miller",
      seller: "",
    },
  ];

  return (
    <div className={Style.AuthorNFTCardBox}>
      {collectiables && <NFTCardTwo NFTData={nfts} />}
      {created && <NFTCardTwo NFTData={myNfts} />}
      {like && <NFTCardTwo NFTData={myNfts} />}
      {follower && (
        <div className={Style.AuthorNFTCardBox_box}>
          {followerArray.map((el, i) => (
            <FollowerTabCard i={i} el={el} />
          ))}
        </div>
      )}
      {following && (
        <div className={Style.AuthorNFTCardBox_box}>
          {followingArray.map((el, i) => (
            <FollowerTabCard i={i} el={el} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AuthorNFTCardBox;
