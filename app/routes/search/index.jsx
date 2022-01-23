import React, { useEffect, useState } from "react";
import { Navbar } from "~/components/seacrchClone/Navbar";

import { Footer } from "~/components/seacrchClone/Footer";

import { Routes } from "~/components/seacrchClone/Routes";

import { ResultContextProvider } from "~/contexts/ResultContextProvider";

import {
  Button,
  Card,
  ProgressBar,
  Row,
  Col,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";

export function links() {
  return [
    {
      rel: "stylesheet",
      href: "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css",
    },
  ];
}

export default function search() {
  const [darkTheme, setDarkTheme] = useState(false);

  return (
    <div>
      <div id="alan-btn"></div>

      <div className="col-8">
        <ResultContextProvider lg="4">
          <Navbar darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
          <Routes />
          <Footer />
        </ResultContextProvider>
      </div>
    </div>
  );
}
