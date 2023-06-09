import React, { useState, useRef, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import swal from "sweetalert";
import { useSelector } from "react-redux";

export default function HeaderStats() {
  const initialState = {
    rc: "",
    pucc: "",
    insurance: "",
    email: "",
  };

  useSelector((state) => {
    initialState.rc = state.auth.rc;
    initialState.pucc = state.auth.pucc;
    initialState.insurance = state.auth.insurance;
    initialState.email = state.auth.email;
  });

  const [ins, setIns] = useState(null);
  const [rc, setrc] = useState(null);
  const [puc, setPuc] = useState(null);

  const [rchash, setRchash] =
    initialState.rc && initialState.rc[0]
      ? useState(initialState.rc[0].uploadImage)
      : useState("");
  const [rcValid, setRcvalid] =
    initialState.rc && initialState.rc[0]
      ? useState(initialState.rc[0].validity)
      : useState("");

  const [puchash, setPuchash] =
    initialState.pucc && initialState.pucc[0]
      ? useState(initialState.pucc[0].uploadImage)
      : useState("");
  const [pucValid, setpucvalid] =
    initialState.pucc && initialState.pucc[0]
      ? useState(initialState.pucc[0].validity)
      : useState("");

  const [insurancehash, setInsurancehash] =
    initialState.insurance[0] && initialState.insurance[0]
      ? useState(initialState.insurance[0].uploadImage)
      : useState("");
  const [insuranceValid, setInsuranceValid] =
    initialState.insurance && initialState.insurance[0]
      ? useState(initialState.insurance[0].validity)
      : useState("");

  const [url, setUrl] = useState("");
  const qrRef = useRef();

  let viewRCBtn;
  if (rchash != "") {
    var ref = "https://ipfs.io/ipfs/" + rchash + "/image/rc.png";
    viewRCBtn = (
      <a
        href={ref}
        target="_blank"
        className="bg-blueGray-700 active:bg-blueGray-600 mb-2 mt-2 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
        type="button"
      >
        <i className="fas fa-eye"></i> View RC
      </a>
    );
  }

  let viewPUCCBtn;
  if (puchash != "") {
    var ref = "https://ipfs.io/ipfs/" + puchash + "/image/puc.png";
    viewPUCCBtn = (
      <a
        href={ref}
        target="_blank"
        className="bg-blueGray-700 active:bg-blueGray-600 mb-2 mt-2 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
        type="button"
      >
        <i className="fas fa-eye"></i> View PUCC
      </a>
    );
  }

  let viewInsBtn;
  if (insurancehash != "") {
    var ref = "https://ipfs.io/ipfs/" + insurancehash + "/image/insurance.png";
    viewInsBtn = (
      <a
        href={ref}
        target="_blank"
        className="bg-blueGray-700 active:bg-blueGray-600 mb-2 mt-2 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
        type="button"
      >
        <i className="fas fa-eye"></i> View Insurance
      </a>
    );
  }

  const downloadQRCode = (e) => {
    let canvas = qrRef.current.querySelector("canvas");
    let image = canvas.toDataURL("image/png");
    let anchor = document.createElement("a");
    anchor.href = image;
    anchor.download = `qr-code.png`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    setUrl("");
  };

  async function sendFileRc() {
    const formData = new FormData();
    formData.append("image", rc);
    formData.append("account", localStorage.getItem("account"));
    formData.append("email", initialState.email);
    console.log(rc);
    let response = await fetch("http://localhost:5000/upload/uploadrc", {
      method: "POST",
      body: formData,
    });
    const jsonData = await response.json();
    if (jsonData.error) {
      swal("Error", jsonData.error, "error");
    } else {
      setRcvalid(jsonData["2"]);
      setRchash(jsonData["0"]);
      swal(
        "Success",
        "Registration Certificate uploaded successfully!",
        "success"
      );
    }
  }

  async function sendFilePUC() {
    const formData = new FormData();
    formData.append("email", initialState.email);
    formData.append("account", localStorage.getItem("account"));
    formData.append("image", puc);
    let response = await fetch("http://localhost:5000/upload/uploadpuc", {
      method: "POST",
      body: formData,
    });
    const jsonData = await response.json();
    if (jsonData.error) {
      swal("Error", jsonData.error, "error");
    } else {
      setPuchash(jsonData["0"]);
      setpucvalid(jsonData["2"]);
      swal(
        "Success",
        "Pollution Control Certificate uploaded successfully!",
        "success"
      );
    }
  }

  async function sendFileIns() {
    const formData = new FormData();
    formData.append("email", initialState.email);
    formData.append("account", localStorage.getItem("account"));
    formData.append("image", ins);
    console.log(ins);
    let response = await fetch("http://localhost:5000/upload/uploadinsurance", {
      method: "POST",
      body: formData,
    });
    const jsonData = await response.json();
    if (jsonData.error) {
      swal("Error", jsonData.error, "error");
    } else {
      setInsuranceValid(jsonData["2"]);
      setInsurancehash(jsonData["0"]);
      swal("Success", "Insurance uploaded successfully!", "success");
    }
  }

  useEffect(() => {
    generateQR();
  }, []);

  async function generateQR() {
    if (
      puchash != "" &&
      pucValid != "" &&
      rchash != "" &&
      rcValid != "" &&
      insurancehash != "" &&
      insuranceValid != ""
    ) {
      var today = new Date().toISOString();
      var pucDatearr = pucValid.split("/");
      var puccdate = pucDatearr[2] + "-" + pucDatearr[1] + "-" + pucDatearr[0];
      var pucdate = new Date(puccdate).toISOString();

      var rcDatearr = rcValid.split("-");
      var rccdate = rcDatearr[2] + "-" + rcDatearr[1] + "-" + rcDatearr[0];
      var rcdate = new Date(rccdate).toISOString();

      var insDatearr = insuranceValid.split("-");
      var inssdate = insDatearr[2] + "-" + insDatearr[1] + "-" + insDatearr[0];
      var insdate = new Date(inssdate).toISOString();

      if (today < rcdate) {
        if (today < pucdate) {
          if (today < insdate) {
            var body = {
              account: localStorage.getItem("account"),
            };
            let response = await fetch("http://localhost:5000/activate", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(body),
            });
            const jsonData = await response.json();
            if (jsonData.link) {
              setUrl(jsonData.link);
              // setUrl("http://127.0.0.1:3000/admin/view");
              swal(
                "QR Code Activated",
                "You can now download and paste the QR on your vehicle!",
                "success"
              );
            } else {
              swal(
                "Upload Documents",
                "Please, upload all the documents required below!",
                "error"
              );
            }
          } else {
            swal("Expired", "Your Insurance has expired, re-upload!", "error");
          }
        } else {
          swal("Expired", "Your PUC has expired, re-upload!", "error");
        }
      } else {
        swal("Expired", "Your RC has expired, re-upload!", "error");
      }
    } else {
      swal(
        "Upload Documents",
        "Please, upload all the documents to generate your QR Code!",
        "info"
      );
    }
  }

  return (
    <>
      {/* Header */}

      <div className="relative mt-32 flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg border-0">
        <div className="px-4 mt-34 md:px-10 mx-auto w-full">
          <div>
            <div className="w-full lg:w-12/12 px-4 text-center mt-2">
              <label className="block text-lg mb-3">
                Scan QR Code to verify documents
              </label>
            </div>

            <div
              ref={qrRef}
              className="w-full lg:w-12/12 px-4 text-center mt-2 mb-4"
            >
              <QRCodeCanvas
                id="qrCode"
                value={url}
                size={200}
                bgColor={"#ffffff"}
                level={"H"}
              />
            </div>

            <div className="w-full lg:w-12/12 px-4 text-center">
              <button
                onClick={generateQR}
                className="bg-blueGray-700 active:bg-blueGray-600 mb-6 text-white font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="button"
              >
                <i className="fas fa-th"></i> Generate QR Code
              </button>
              <button
                onClick={downloadQRCode}
                className="bg-blueGray-700 active:bg-blueGray-600 mb-6 text-white font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="button"
              >
                <i className="fas fa-download"></i> Download QR Code
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative flex flex-col min-w-0 break-words w-full shadow-lg rounded-lg bg-blueGray-800 border-0">
        <div className="px-4 mt-34 md:px-10 mx-auto w-full">
          <div>
            <div className="w-full lg:w-12/12 px-4 text-center mt-3">
              <label className="block text-white text-xl mb-4">
                Manage Travel Documents
              </label>
            </div>

            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 mb-2 xl:w-12/12 px-4">
                <div className="bg-white text-center border-radius p-2">
                  <label
                    className="block text-center text-blueGray-600 text-md font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Registration Certificate
                  </label>
                  <div className="w-full lg:w-12/12 px-4 text-center">
                    <input
                      type="file"
                      className="mt-2 mb-2 text-center-last"
                      onChange={(e) => setrc(e.target.files[0])}
                    />
                  </div>
                  <div className="w-full lg:w-12/12 px-4 text-center">
                    {initialState.rc &&
                    initialState.rc[0] &&
                    initialState.rc[0].uploadImage ? (
                      <button
                        className="bg-Green-700 active:bg-Green-700 mb-2 mt-2 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={sendFileRc}
                      >
                        <i className="fas fa-edit"></i> Edit
                      </button>
                    ) : (
                      <button
                        className="bg-blueGray-700 active:bg-blueGray-600 mb-2 mt-2 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={sendFileRc}
                      >
                        <i className="fas fa-upload"></i> Upload
                      </button>
                    )}

                    {viewRCBtn}
                  </div>
                  {rcValid != "" ? (
                    <label className="label-validity font-bold">
                      {" "}
                      Valid Upto: {rcValid}{" "}
                    </label>
                  ) : null}
                </div>
              </div>

              <div className="w-full lg:w-6/12 mb-2 xl:w-6/12 px-4">
                <div
                  style={{ textAlignLast: "center" }}
                  className="bg-white border-radius p-2"
                >
                  <label
                    className="block text-center text-blueGray-600 text-md font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    PUCC
                  </label>

                  <div className="w-full lg:w-12/12 px-4 text-center">
                    <input
                      type="file"
                      className="mt-2 mb-2 text-center-last"
                      onChange={(e) => setPuc(e.target.files[0])}
                    />
                  </div>

                  <div className="w-full lg:w-12/12 px-4 text-center">
                    {puchash != "" ? (
                      <button
                        className="bg-Green-700 active:bg-Green-600 mb-2 mt-2 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={sendFilePUC}
                      >
                        <i className="fas fa-edit"></i> Edit
                      </button>
                    ) : (
                      <button
                        className="bg-blueGray-700 active:bg-blueGray-600 mb-2 mt-2 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={sendFilePUC}
                      >
                        <i className="fas fa-upload"></i> Upload
                      </button>
                    )}

                    {viewPUCCBtn}
                  </div>
                  {pucValid != "" ? (
                    <label className="label-validity font-bold">
                      {" "}
                      Valid Upto: {pucValid}{" "}
                    </label>
                  ) : null}
                </div>
              </div>

              <div className="w-full lg:w-6/12 mb-2 xl:w-6/12 px-4">
                <div className="bg-white text-center border-radius p-2">
                  <label
                    className="block text-center text-blueGray-600 text-md font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Insurance
                  </label>

                  <div className="w-full lg:w-12/12 px-4 text-center">
                    <input
                      type="file"
                      className="mt-2 mb-2 text-center-last"
                      onChange={(e) => setIns(e.target.files[0])}
                    />
                  </div>

                  <div className="w-full lg:w-12/12 px-4 text-center">
                    {insurancehash != "" ? (
                      <button
                        className="bg-Green-700 active:bg-Green-600 mb-2 mt-2 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={sendFileIns}
                      >
                        <i className="fas fa-edit"></i> Edit
                      </button>
                    ) : (
                      <button
                        className="bg-blueGray-700 active:bg-blueGray-600 mb-2 mt-2 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={sendFileIns}
                      >
                        <i className="fas fa-upload"></i> Upload
                      </button>
                    )}

                    {viewInsBtn}
                  </div>
                  {insuranceValid != "" ? (
                    <label className="label-validity font-bold">
                      {" "}
                      Valid Upto: {insuranceValid}{" "}
                    </label>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
