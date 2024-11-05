import React, { useState, useEffect, useRef } from "react";
import styles from "./hamburgerMenu.css";
import Image from "next/image";
import { pressStart2P, sourceCodePro, instrumentSans } from "../styles/fonts";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (
        !menuRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleDocumentClick);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("click", handleDocumentClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div
      ref={menuRef}
      className={`menu-container ${isOpen ? "open" : ""} m-auto relative z-50`}
    >
      <button
        ref={buttonRef}
        className="px-4 py-2 shadow m-auto rounded-full border-gray-200"
        onClick={toggleMenu}
      >
        <img
          src="/hamburger.svg"
          alt="Hamburger Icon"
          width="24"
          height="24"
          className="w-full"
        />
      </button>
      <nav
        className={`menu ${
          isOpen ? "open" : ""
        } rounded-3xl px-12 py-4 flex flex-col justify-center gap-x-4 shadow z-20`}
      >
        <p className={`text-center ${pressStart2P.className} mb-4`}>Menu</p>
        <ul className="flex flex-row gap-4 justify-center uppercase">
          {/* Keep only the following two list items and remove the rest */}
          <li className="flex flex-col gap-4">
            <a href="/pdf">
              <span>
                <div className="rounded-xl overflow-hidden h-40 w-32 drop-shadow">
                  <div className="absolute inset-0">
                    <Image
                      src="/assets/images/pdf.png"
                      alt="CHAT-PDF"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                </div>
                <p className={`text-m font-bold text-gray-200 ${sourceCodePro.className}`}>
                  CHAT-PDF
                </p>
              </span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default HamburgerMenu;
