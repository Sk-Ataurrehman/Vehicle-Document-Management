import { updateUser } from "data-store/authSlice";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";

export default function CardSettings() {
  const router = useRouter();
  const dispatch = useDispatch();

  const initialValue = {
    fullName: "",
    email: "",
    phoneno: "",
    aadharno: "",
    rc: "",
  };

  useSelector((state) => {
    initialValue.fullName = state.auth.fullName;
    initialValue.email = state.auth.email;
    initialValue.phoneno = state.auth.phoneno;
    initialValue.aadharno = state.auth.aadharno;
    initialValue.rc = state.auth.rc;
  });

  const [fullName, setFullName] = useState(initialValue.fullName);
  const [email, setEmail] = useState(initialValue.email);
  const [phoneno, setPhoneno] = useState(initialValue.phoneno);
  const [aadharno, setAadharnno] = useState(initialValue.aadharno);

  const updateHandler = () => {
    dispatch(updateUser({ fullName, email, phoneno }));
    swal("Success", "Details Updated Successful", "success");
  };

  return (
    <>
      <div className="relative mt-32 flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-blueGray-800 mb-0 px-6 py-3">
          <div className="text-center flex justify-between">
            <h6 className="text-white text-lg font-bold">
              <i className="fas fa-user"></i> User Information
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
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
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
                    onChange={(e) => setAadharnno(e.target.value)}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    disabled
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
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Enter your mobile number"
                  />
                </div>
              </div>

              <div className="w-full lg:w-6/12 px-4">
                <button
                  onClick={updateHandler}
                  className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="button"
                >
                  <i className="fas fa-pen"></i> Edit Details
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="relative mt-12 flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-blueGray-800 mb-0 px-6 py-3">
          <div className="text-center flex justify-between">
            <h6 className="text-white text-lg font-bold">
              <i className="fas fa-user"></i> Vehicle Information
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
                    value={initialValue.rc[0].regNo}
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
                    Chassis No.{" "}
                  </label>
                  <input
                    type="text"
                    value={initialValue.rc[0].chNo}
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
                    value={initialValue.rc[0].type}
                    readOnly
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    disabled
                  />
                </div>
              </div>

              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Validity
                  </label>
                  <input
                    type="text"
                    value={initialValue.rc[0].validity}
                    readOnly
                    maxLength={10}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Enter your mobile number"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
