import React, { useEffect } from "react";

import Sidebar from "components/Sidebar/Sidebar.js";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

export default function Admin({ children }) {
  const router = useRouter();
  const isLogin = useSelector((state) => state.auth.isLogin)
  
  useEffect(() => {
    console.log(isLogin)
    if (!isLogin) {
      router.push('/auth/login');
    }
  }, []);
  
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          {children}
        </div>
      </div>
    </>
  );
}
