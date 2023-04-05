import React from "react";

import CardView from "components/Cards/CardView";

import Admin from "layouts/Admin.js";

export default function Settings() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-12/12 px-4">
          <CardView />
        </div>
      </div>
    </>
  );
}

Settings.layout = Admin;
