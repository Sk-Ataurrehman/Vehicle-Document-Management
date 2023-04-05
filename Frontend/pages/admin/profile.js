import React from "react";

import CardProfile from "components/Cards/CardProfile.js";

import Admin from "layouts/Admin.js";

export default function Settings() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-12/12 px-4">
          <CardProfile />
        </div>
      </div>
    </>
  );
}

Settings.layout = Admin;
