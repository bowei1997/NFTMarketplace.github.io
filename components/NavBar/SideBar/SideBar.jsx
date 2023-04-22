import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { GrClose } from "react-icons/gr";
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialTwitter,
  TiSocialYoutube,
  TiSocialInstagram,
  TiArrowSortedDown,
  TiArrowSortedUp,
} from "react-icons/ti";

// INTERNAL IMPORT
import Style from "./SideBar.module.css";
import images from "../../../img";
import Button from "../../Button/Button";

const SideBar = ({ setOpenSideMenu, currentAccount, connectWallet }) => {
  //----USESTATE
  const [openDiscover, setOpenDiscover] = useState(false);
  const [openHelp, setOpenHelp] = useState(false);

  // Discover Navigation Menu
  const discover = [
    {
      name: "Collection",
      link: "collection",
    },
    {
      name: "Search",
      link: "search",
    },
    {
      name: "Author Profile",
      link: "author-profile",
    },
    {
      name: "NFT Details",
      link: "NFT-details",
    },
    {
      name: "Account Setting",
      link: "account-setting",
    },
    {
      name: "Connect wallet",
      link: "connect-wallet",
    },
    {
      name: "Blog",
      link: "blog",
    },
  ];
  // Help Center Navigation Menu
  const helpCenter = [
    {
      name: "About",
      link: "about",
    },
    {
      name: "Contact Us",
      link: "contact-us",
    },
    {
      name: "Sign Up",
      link: "sign-ip",
    },
    {
      name: "Sign In",
      link: "sign-in",
    },
    {
      name: "Subscription",
      link: "subscription",
    },
  ];

  const openDiscoverMenu = () => {
    if (!openDiscover) {
      setOpenDiscover(true);
    } else {
      setOpenDiscover(false);
    }
  };

  const openHelpMenu = () => {
    if (!openHelp) {
      setOpenHelp(true);
    } else {
      setOpenHelp(false);
    }
  };

  const closeSideBar = () => {
    setOpenSideMenu(false);
  };

  return (
    <div className={Style.sideBar}>
      <GrClose
        className={Style.sideBar_closeBtn}
        onClick={() => closeSideBar()}
      />

      <div className={Style.sideBar_box}>
        <Image src={images.logo} alt="logo" width={150} heigth={150} />
        <p>Discover the most outstanding articles on all topics of NFT</p>
        <div className={Style.sideBar_social}>
          <a href="#">
            <TiSocialFacebook />
          </a>
          <a href="#">
            <TiSocialLinkedin />
          </a>
          <a href="#">
            <TiSocialTwitter />
          </a>
          <a href="#">
            <TiSocialYoutube />
          </a>
          <a href="#">
            <TiSocialInstagram />
          </a>
        </div>
      </div>

      {/*SideBar Menu*/}
      <div className={Style.sideBar_menu}>
        <div
          className={Style.sideBar_menu_box}
          onClick={() => openDiscoverMenu()}
        >
          <p>Discover</p>
          <TiArrowSortedDown />
        </div>

        {openDiscover && (
          <div
            className={Style.sideBar_discover}
            onClick={() => setOpenSideMenu(false)}
          >
            {discover.map((element, Ikey) => (
              <p key={Ikey + 1}>
                <Link href={{ pathname: `${element.link}` }} key={Ikey + 1}>
                  {element.name}
                </Link>
              </p>
            ))}
          </div>
        )}

        {/* Help SideBar Menu*/}
        <div>
          <div
            className={Style.sideBar_menu_box}
            onClick={() => openHelpMenu()}
          >
            <p>HELP CENTER</p>
            <TiArrowSortedDown />
          </div>
          {openHelp && (
            <div className={Style.sideBar_discover}>
              {helpCenter.map((element, Ikey) => (
                <p key={Ikey + 1}>
                  <Link href={{ pathname: `${element.link}` }} key={Ikey + 1}>
                    {element.name}
                  </Link>
                </p>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* side button*/}
      <div className={Style.sideBar_button}>
        {currentAccount == "" ? (
          <Button
            btnName="Connect"
            handleClick={() => {
              connectWallet();
            }}
          />
        ) : (
          <Link href={{ pathname: "/uploadNFT" }}>
            <Button btnName="Create" handleClick={() => {}} />
          </Link>
        )}
        <Button btnName="Connect Wallet" handleClick={() => {}} />
      </div>
    </div>
  );
};

export default SideBar;
