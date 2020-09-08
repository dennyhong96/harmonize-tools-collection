import React, { useState, useEffect, useRef, useCallback } from "react";

import HarmonizeLogo from "../../Assets/harmonize_logo.png";
import "./MainPageNavbar.scss";

const Header = () => {
  // DOM Reference of dropdown menu
  const dropdownRef = useRef(null);

  // State for showing and hiding dropdown manu
  const [showDropdown, setShowDropdown] = useState(false);

  // State for switching navbar background color
  const [whiteNavbar, setWhiteNavbar] = useState(false);

  // Switch navbar color when scrolling
  const handleScroll = useCallback(() => {
    if (window.pageYOffset > 50) {
      setWhiteNavbar(true);
    } else {
      setWhiteNavbar(false);
    }
  }, []);

  useEffect(() => {
    // Listen to scroll event and switch navbar color
    window.addEventListener("scroll", handleScroll);

    // Cleanup Effect
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <header>
      <nav className={`navbar-custom ${whiteNavbar ? "white" : ""}`}>
        <div className="container">
          {/* Navbar Brand */}
          <a
            href="https://www.attendancebot.com/blog/"
            className="navbar-brand"
          >
            <img src={HarmonizeLogo} alt="logo" /> Harmonize
          </a>
          {/* Navbar Links */}
          <ul>
            <li>
              <button
                className="products-drop"
                onMouseOver={() => setShowDropdown(true)}
                onMouseLeave={() => setShowDropdown(false)}
              >
                Products{" "}
                <i
                  className="fas fa-chevron-down"
                  style={{ marginLeft: "2.5px" }}
                ></i>
                {/* Navbar product dropdown menu */}
                {showDropdown && (
                  <div className="product-dropdown" ref={dropdownRef}>
                    <div className="dropdown-content">
                      <a target="_blank" rel="noreferrer" href="/calculator">
                        Paycheck Calculator
                      </a>
                      <a target="_blank" rel="noreferrer" href="/orgchart">
                        Organizational Chart
                      </a>
                      <a href="#!">Contract Generator</a>
                      <a href="#!">Onboarding</a>
                    </div>
                  </div>
                )}
              </button>
            </li>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.attendancebot.com/blog/"
              >
                Blog
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
