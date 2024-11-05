"use client";

import React, { useEffect, useState } from "react";

import Link from "next/link";
import { sourceCodePro } from "./styles/fonts";
import HamburgerMenu from "./components/HamburgerMenu";
const Navbar = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // const Navbar = () => {
  return (
    <nav className="fixed z-10 top-0 bg-gray-50 text-gray-800 w-full p-4 grid grid-cols-3 items-center">
      <a href="/" className={`text-center`}>
        Home Page
      </a>
      {isClient && <HamburgerMenu />}{" "}
      <p className={`text-center`}> 273 Project</p>
    </nav>
  );
};

export default Navbar;