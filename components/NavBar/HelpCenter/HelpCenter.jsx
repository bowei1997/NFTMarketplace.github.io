import React, { useContext, useEffect } from "react";
import Link from "next/link";
//INTERNAL IMPORT
import Style from "./HelpCenter.module.css";

const HelpCenter = () => {
  // Help Center Navigation Menu
  const helpCenter = [
    {
      name: "About",
      link: "aboutus",
    },
    {
      name: "Contact Us",
      link: "contactus",
    },
    {
      name: "Sign Up",
      link: "signUp",
    },
    {
      name: "Sign In",
      link: "login",
    },
    {
      name: "Subscription",
      link: "subscription",
    },
  ];
  return (
    <div className={Style.box}>
      {helpCenter.map((element, Ikey) => (
        <div className={Style.helpCenter} key={Ikey + 1}>
          <Link href={{ pathname: `${element.link}` }}>{element.name}</Link>
        </div>
      ))}
    </div>
  );
};

export default HelpCenter;
