import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

function navbar() {
  return (
    <Navbar bg="dark">
      <Navbar.Brand>
        <img
          src="/sfox.png"
          width="100"
          height="40"
          alt="React Bootstrap logo"
        />
      </Navbar.Brand>
      <Nav className=" navitem">
        <Link to="/" className="padding" id="links">
          Home
        </Link>
      </Nav>
      <Nav className="ml-auto navitem">
        <Link to="/uniswapv2" className="padding" id="links">
          Query from Uniswap V2 Contract Here
        </Link>
      </Nav>
     
    </Navbar>
  );
}

export default navbar;
