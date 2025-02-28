import { useState } from "react";
import styles from "../styles/header.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";

type HeaderListItem = {
  label: string;
  onClick: Function;
  customClass?: string;
};

export default () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  const NAVBAR_ITEMS: HeaderListItem[] = [
    {
      label: "MarketPlace",
      onClick: (event: MouseEvent) => {
        console.log("MarketPlace clicked");
      },
    },
    {
      label: "LeaderBoard",
      onClick: (event: MouseEvent) => {
        console.log("LeaderBoard clicked");
      },
    },
    {
      label: "Governance",
      onClick: (event: MouseEvent) => {
        console.log("Governance clicked");
      },
    },
    {
      label: "Staking",
      onClick: (event: MouseEvent) => {
        console.log("Staking clicked");
      },
    },
    {
      label: "Random",
      onClick: (event: MouseEvent) => {
        console.log("Random clicked");
      },
    },
  ];

  const MAINNET_DROPDOWN: HeaderListItem[] = [
    {
      label: "Testnet",
      onClick: (event: MouseEvent) => {
        console.log("Testnet clicked..");
        setIsDropdownOpen(false);
      },
    },
  ];

  return (
    <>
      <div className={`${styles.headerContainer}`}>
        <div style={{ marginLeft: "17px" }}>
          <Link href="/">
            <img
              style={{ cursor: "pointer" }}
              src="/logo1.svg"
              alt="A"
              width={"32px"}
              height={"46px"}
            />
          </Link>
        </div>
        <div className={styles.divider}></div>
        {/* Mainnet Dropdown */}
        <div
          className={`${styles.dropdown} ${isDropdownOpen ? styles.open : ""}`}
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <div
            className={`${styles.dropdownTrigger}`}
            onClick={() => setIsDropdownOpen(true)}
          >
            <Image src="/logo.svg" alt="A" width={"24px"} height={"24px"} />
            Mainnet
            <Image
              src="/down-arrow.svg"
              alt="A"
              width={"16px"}
              height={"8px"}
            />
          </div>
          {isDropdownOpen && (
            <ul>
              {MAINNET_DROPDOWN.map((item, index) => (
                <li
                  key={index}
                  className={`${styles.dropdownItem}`}
                  onClick={(e) => item.onClick(e)}
                >
                  {item.label}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className={styles.divider}></div>
        {/* Navbar Links */}
        <ul>
          {NAVBAR_ITEMS.map((item, index) => (
            <Link href={"/" + item.label.toLowerCase()}>
              <li
                key={index}
                /* onClick={(event) => item.onClick(event)} */ className={
                  item.customClass ?? ""
                }
              >
                {item.label}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </>
  );
};
