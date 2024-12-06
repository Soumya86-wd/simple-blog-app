import React from "react";
import { Link, useNavigate } from "react-router";
import { useSelector } from "react-redux";

import Container from "../Container/Container";
import Logo from "../Logo";
import LogoutBtn from "./LogoutBtn";
import { generateNavItems } from "../../routes";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate(authStatus);
  const navItems = generateNavItems(authStatus);

  return (
    <header className="py-3 shadow bg-gray-500">
      <Container>
        <nav className="flex">
          {/* Logo block */}
          <div className="mr-4">
            <Link to="/">
              <Logo />
            </Link>
          </div>
          {/* Logo block ends here */}

          {/* Menu Items */}
          <ul className="flex ml-auto">
            {navItems.map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => navigate(item.endpoint)}
                  className="inline-block px-6 py-2 hover:bg-blue-100 duration-200 rounded-full"
                >
                  {item.name}
                </button>
              </li>
            ))}

            {authStatus && (
              <li key="Logout">
                <LogoutBtn />
              </li>
            )}
          </ul>
          {/* Menu Items block ends */}
        </nav>
      </Container>
    </header>
  );
}

export default Header;
