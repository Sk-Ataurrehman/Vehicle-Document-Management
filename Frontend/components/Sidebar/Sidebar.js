import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { logoutUser } from "data-store/authSlice";
import { useDispatch } from "react-redux";
import Web3 from "web3";

export default function Sidebar() {
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  const [web3, setWeb3] = React.useState();
  const [address, setAddress] = React.useState();

  const router = useRouter();
  const dispatch = useDispatch();

  const connectWalletHandler = async () => {
    if (
      typeof window !== "undefined" &&
      typeof window.ethereum !== "undefined"
    ) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const web3 = new Web3(window.ethereum);
        setWeb3(web3);
        const accounts = await web3.eth.getAccounts();
        setAddress(accounts[0]);
        localStorage.setItem("account", accounts[0]);
        console.log(accounts[0]);
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("Warning: Install Metamask");
    }
  };

  const disconnectWalletHandler = async () => {
    dispatch(logoutUser());
    window.location.href = "/";
  };

  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-blueGray-800 flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-white opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            <i className="fas fa-bars"></i>
          </button>
          {/* Brand */}
          <Link href="/">
            <a
              href="#pablo"
              className="md:block text-left md:pb-2 text-white mr-0 inline-block whitespace-nowrap text-lg font-bold p-4 px-0"
            >
              TravelDoc
            </a>
          </Link>
          {/* Collapse */}
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link href="/">
                    <a
                      href="#pablo"
                      className="md:block text-left md:pb-2 text-white mr-0 inline-block whitespace-nowrap text-sm font-bold p-4 px-0"
                    >
                      TravelDoc
                    </a>
                  </Link>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>
            {/* Form */}

            {/* Divider */}
            <hr className="mb-4 md:min-w-full" />

            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              <li className="items-center">
                <Link href="/admin/dashboard">
                  <a
                    href="#pablo"
                    className={
                      "text-xs uppercase py-3 font-bold block " +
                      (router.pathname.indexOf("/admin/dashboard") !== -1
                        ? "text-lightBlue-500 hover:text-lightBlue-600"
                        : "text-blueGray-500 hover:text-blueGray-700")
                    }
                  >
                    <i
                      className={
                        "fas fa-tv mr-2 text-sm " +
                        (router.pathname.indexOf("/admin/dashboard") !== -1
                          ? "opacity-75"
                          : "text-blueGray-300")
                      }
                    ></i>{" "}
                    Documents
                  </a>
                </Link>
              </li>

              <li className="items-center">
                <Link href="/admin/profile">
                  <a
                    href="#pablo"
                    className={
                      "text-xs uppercase py-3 font-bold block " +
                      (router.pathname.indexOf("/admin/profile") !== -1
                        ? "text-lightBlue-500 hover:text-lightBlue-600"
                        : "text-blueGray-500 hover:text-blueGray-700")
                    }
                  >
                    <i
                      className={
                        "fas fa-user mr-2 text-sm " +
                        (router.pathname.indexOf("/admin/profile") !== -1
                          ? "opacity-75"
                          : "text-blueGray-300")
                      }
                    ></i>{" "}
                    Profile
                  </a>
                </Link>
              </li>

              <li className="items-center">
                {typeof window !== "undefined" &&
                localStorage &&
                localStorage.getItem("account") ? (
                  <button
                    className={
                      "text-xs uppercase py-3 font-bold block " +
                      (router.pathname.indexOf("/admin/maps") !== -1
                        ? "text-lightBlue-500 hover:text-lightBlue-600"
                        : "text-blueGray-500 hover:text-blueGray-700")
                    }
                  >
                    <i
                      className={
                        "fas fa-check-circle mr-2 text-sm " +
                        (router.pathname.indexOf("/admin/maps") !== -1
                          ? "opacity-75"
                          : "text-blueGray-300")
                      }
                    ></i>{" "}
                    Connected
                  </button>
                ) : (
                  <button
                    onClick={connectWalletHandler}
                    className={
                      "text-xs uppercase py-3 font-bold block " +
                      (router.pathname.indexOf("/admin/maps") !== -1
                        ? "text-lightBlue-500 hover:text-lightBlue-600"
                        : "text-blueGray-500 hover:text-blueGray-700")
                    }
                  >
                    <i
                      className={
                        "fas fa-arrow-alt-circle-down mr-2 text-sm " +
                        (router.pathname.indexOf("/admin/maps") !== -1
                          ? "opacity-75"
                          : "text-blueGray-300")
                      }
                    ></i>{" "}
                    Connect to MetaMask
                  </button>
                )}
              </li>

              <li className="items-center">
                <button
                  onClick={disconnectWalletHandler}
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (router.pathname.indexOf("/admin/maps") !== -1
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-500 hover:text-blueGray-700")
                  }
                >
                  <i
                    className={
                      "fas fa-sign-out-alt mr-2 text-sm " +
                      (router.pathname.indexOf("/admin/maps") !== -1
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  ></i>{" "}
                  Logout
                </button>
              </li>

              <li className="items-center">
                <Link href="/admin/view">
                  <button
                    className={
                      "text-xs uppercase py-3 font-bold block " +
                      (router.pathname.indexOf("/admin/maps") !== -1
                        ? "text-lightBlue-500 hover:text-lightBlue-600"
                        : "text-blueGray-500 hover:text-blueGray-700")
                    }
                  >
                    <i
                      className={
                        "fas fa-eye mr-2 text-sm " +
                        (router.pathname.indexOf("/admin/maps") !== -1
                          ? "opacity-75"
                          : "text-blueGray-300")
                      }
                    ></i>{" "}
                    View
                  </button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
