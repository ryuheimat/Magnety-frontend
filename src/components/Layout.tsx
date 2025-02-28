import React, { PropsWithChildren, useEffect, useState } from "react";
import Navbar from "./Navbar";
import { getStarknet } from "../starknetWrapper";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { setAccount, selectCount, increment } from "../app/counterSlice";
import { IncrementCounter } from "./IncrementCounter";
import Profile from "./Profile";

const Layout = (props: PropsWithChildren<unknown>) => {
  const dispatch = useAppDispatch();
  const count = useAppSelector(selectCount);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState("connect wallet");

  useEffect(() => {
    const connectWalletOnPageLoad = async () => {
      if (localStorage?.getItem("isWalletConnected") === "true") {
        onClick();
      }
    };
    connectWalletOnPageLoad();
  }, []);

  const onClick = () => {
    const starkNet = getStarknet();
    let mod = true;
    if (localStorage?.getItem("isWalletConnected") === "true") {
      mod = false;
    }
    starkNet.enable({ showModal: mod }).then((value) => {
      setAddress(JSON.stringify(value));
      localStorage.setItem("isWalletConnected", "true");
      dispatch(increment());
      console.log(starkNet.account);
      setIsConnected(true);
    });
  };

  function ConnectWallet() {
    return (
      <div className="App">
        <button
          data-color="secondary"
          style={{ display: "flex", margin: "12px auto" }}
          onClick={onClick}
        >
          {" "}
          connect
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="page">
        <Navbar />
        <div className="page__wrapper">
          <div className="page__backdrop" />
          <div className="page__content">{props.children}</div>
        </div>
        <div
          className={`page__sidebar_wrapper ${
            isSidebarOpen ? "page__sidebar_open" : ""
          }`}
        >
          <div className="page__sidebar_backdrop"></div>
          <div className="page__sidebar">
            {!isSidebarOpen && !isConnected && (
              <>
                <div className="fs-16 fw-700">Hello</div>
                <div className="fs-12">
                  please connect you wallect in order to use the full
                  fonctionnalities of Magnety{" "}
                </div>
                <ConnectWallet />
              </>
            )}
            {!isSidebarOpen && isConnected && (
              <>
                <div className="fs-16 fw-700">
                  Hello {address.substring(2, 7)}..
                </div>
                <div className="fs-12">Your account is verified</div>

                <div
                  className="fs-14 fw-600"
                  style={{ marginTop: "43px", marginBottom: "13px" }}
                >
                  Statistics
                </div>
                <div className="d-flex justify-content-space-around">
                  <div className="d-flex-column align-items-center">
                    <div className="fs-12 fw-500">funds</div>
                    <div className="fs-14 fw-600" style={{ marginTop: "5px" }}>
                      3
                    </div>
                  </div>
                  <div>
                    <div className="fs-12 fw-500">PNL</div>
                    <div className="fs-14 fw-600" style={{ marginTop: "5px" }}>
                      $350
                    </div>
                  </div>
                </div>

                <div
                  className="fs-14 fw-600"
                  style={{ marginTop: "23px", marginBottom: "6px" }}
                >
                  Manage
                </div>
                <div className="fs-12 fw-500">
                  Manage your funds by using the Assets Manager Interface
                </div>
                <button
                  data-color="secondary"
                  style={{ display: "flex", margin: "8px auto" }}
                >
                  Launch
                </button>

                <div
                  className="fs-14 fw-600"
                  style={{ marginTop: "31px", marginBottom: "6px" }}
                >
                  Create
                </div>
                <div className="fs-12 fw-500">
                  Start a new trading adventure by creating a new vault
                </div>
                <button
                  data-color="secondary"
                  style={{ display: "flex", margin: "8px auto" }}
                >
                  Create
                </button>
              </>
            )}

            {isSidebarOpen && (
              <>
                <Profile></Profile>
              </>
            )}
          </div>
          <div className="page__sidebar_toggler">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}></button>
            {!isSidebarOpen && (
              <>Expand to edit and see all your personnal informations</>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
