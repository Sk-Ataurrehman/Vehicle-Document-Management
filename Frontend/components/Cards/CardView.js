import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function CardSettings() {
  const initialValue = {
    fullName: "",
    email: "",
    phoneno: "",
    aadharno: "",

    rcDocHash: "",
    rcExp: "",
    pucDocHash: "",
    pucExp: "",
    insDocHash: "",
    insExp: "",
  };

  useSelector((state) => {
    initialValue.fullName = state.auth.fullName;
    initialValue.email = state.auth.email;
    initialValue.phoneno = state.auth.phoneno;
    initialValue.aadharno = state.auth.aadharno;
  });

  const [fullName, setFullName] = useState(initialValue.fullName);
  const [email, setEmail] = useState(initialValue.email);
  const [phoneno, setPhoneno] = useState(initialValue.phoneno);
  const [aadharno, setAadharnno] = useState(initialValue.aadharno);

  getDetails();

  const [rcDocHash, setrcDocHash] = useState(initialValue.rcDocHash);
  const [rcExp, setrcExp] = useState(initialValue.rcExp);
  const [pucDocHash, setpucDocHash] = useState(initialValue.pucDocHash);
  const [pucExp, setpucExp] = useState(initialValue.pucExp);
  const [insDocHash, setinsDocHash] = useState(initialValue.insDocHash);
  const [insExp, setinsExp] = useState(initialValue.insExp);

  async function getDetails() {
    var body = {
      account: localStorage.getItem("account"),
    };
    let response = await fetch("http://localhost:5000/view", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const jsonData = await response.json();

    setinsDocHash(jsonData["insuranceDetails"][0]);
    setinsExp(jsonData["insuranceDetails"][2]);

    setpucDocHash(jsonData["pucDetails"][0]);
    setpucExp(jsonData["pucDetails"][2]);

    setrcDocHash(jsonData["rcDetails"][0]);
    setrcExp(jsonData["rcDetails"][2]);
  }

  const initialState = {
    rc: "",
    pucc: "",
    insurance: "",
  };

  useSelector((state) => {
    initialState.rc = state.auth.rc;
    initialState.pucc = state.auth.pucc;
    initialState.insurance = state.auth.insurance;
  });

  console.log(initialState.rc);
  let viewRCBtn;

  var ref = "https://ipfs.io/ipfs/" + rcDocHash + "/image/rc.png";
  viewRCBtn = (
    <a
      href={ref}
      target="_blank"
      className="bg-blueGray-700 active:bg-blueGray-600 mb-4 mt-2 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
      type="button"
    >
      <i className="fas fa-eye"></i> View RC
    </a>
  );

  let viewPUCCBtn;

  var ref = "https://ipfs.io/ipfs/" + pucDocHash + "/image/puc.png";
  viewPUCCBtn = (
    <a
      href={ref}
      target="_blank"
      className="bg-blueGray-700 active:bg-blueGray-600 mb-4 mt-2 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
      type="button"
    >
      <i className="fas fa-eye"></i> View PUCC
    </a>
  );

  let viewInsBtn;

  var ref = "https://ipfs.io/ipfs/" + insDocHash + "/image/insurance.png";
  viewInsBtn = (
    <a
      href={ref}
      target="_blank"
      className="bg-blueGray-700 active:bg-blueGray-600 mb-4 mt-2 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
      type="button"
    >
      <i className="fas fa-eye"></i> View Insurance
    </a>
  );

  return (
    <>
      <div className="relative mt-32 flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-blueGray-800 mb-0 px-6 py-3">
          <div className="text-center flex justify-between">
            <h6 className="text-white text-lg font-bold">User Information</h6>
          </div>
        </div>

        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form>
            <div className="flex flex-wrap mt-4">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    readOnly
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    readOnly
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Enter Email Address"
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Aadhar Number
                  </label>
                  <input
                    type="text"
                    value={aadharno}
                    readOnly
                    onChange={(e) => setAadharnno(e.target.value)}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>

              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    value={phoneno}
                    onChange={(e) => setPhoneno(e.target.value)}
                    maxLength={10}
                    readOnly
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Enter your mobile number"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-blueGray-800 mb-0 px-6 py-3">
          <div className="text-center flex justify-between">
            <h6 className="text-white text-lg font-bold">RC Information</h6>
          </div>
        </div>

        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form>
            <div className="flex flex-wrap mt-4">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Registration No.
                  </label>
                  <input
                    type="text"
                    value={initialState.rc[0].regNo}
                    readOnly
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Valid Upto
                  </label>
                  <input
                    type="text"
                    value={initialState.rc[0].validity}
                    readOnly
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Chassis No.
                  </label>
                  <input
                    type="text"
                    value={initialState.rc[0].chNo}
                    readOnly
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>

              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Vehicle Type
                  </label>
                  <input
                    type="text"
                    value={initialState.rc[0].type}
                    readOnly
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>

              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Vehicle Owner
                  </label>
                  <input
                    type="text"
                    value={initialState.rc[0].owner}
                    readOnly
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>

              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Vehicle Manufacturer
                  </label>
                  <input
                    type="text"
                    value={initialState.rc[0].manufacturer}
                    readOnly
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">{viewRCBtn}</div>
            </div>
          </form>
        </div>
      </div>

      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-blueGray-800 mb-0 px-6 py-3">
          <div className="text-center flex justify-between">
            <h6 className="text-white text-lg font-bold">PUCC Information</h6>
          </div>
        </div>

        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form>
            <div className="flex flex-wrap mt-4">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Registration No.
                  </label>
                  <input
                    type="text"
                    value={initialState.pucc[0].regNo}
                    readOnly
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Valid Upto
                  </label>
                  <input
                    type="text"
                    value={initialState.pucc[0].validity}
                    readOnly
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Certificate No.
                  </label>
                  <input
                    type="text"
                    value={initialState.pucc[0].certificate}
                    readOnly
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>

              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Registration Date
                  </label>
                  <input
                    type="text"
                    value={initialState.pucc[0].regDate}
                    readOnly
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>

              <div className="w-full lg:w-6/12 px-4">{viewPUCCBtn}</div>
            </div>
          </form>
        </div>
      </div>

      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-blueGray-800 mb-0 px-6 py-3">
          <div className="text-center flex justify-between">
            <h6 className="text-white text-lg font-bold">
              Insurance Information
            </h6>
          </div>
        </div>

        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form>
            <div className="flex flex-wrap mt-4">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Registration No.
                  </label>
                  <input
                    type="text"
                    value={initialState.insurance[0].regNo}
                    readOnly
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Valid Upto
                  </label>
                  <input
                    type="text"
                    value={initialState.insurance[0].validity}
                    readOnly
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Policy No.
                  </label>
                  <input
                    type="text"
                    value={initialState.insurance[0].policy}
                    readOnly
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>

              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Vehicle Owner
                  </label>
                  <input
                    type="text"
                    value={initialState.insurance[0].owner}
                    readOnly
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>

              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Model
                  </label>
                  <input
                    type="text"
                    value={initialState.insurance[0].model}
                    readOnly
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
            </div>
            <div className="w-full lg:w-12/12 px-4">{viewInsBtn}</div>
          </form>
        </div>
      </div>
    </>
  );
}
