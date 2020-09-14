import React from "react";
import { Navbar, Container, NavbarBrand } from "react-bootstrap";

function Footer() {
  return (
    <div className="fixed-bottom center">
      <Navbar color="dark" dark>
        <Container>
          <NavbarBrand>
            {" "}
            <h6>
              <div id="link">Developed by Kumar Gaurav</div>
              <div className="contact">
                <div className="underline-link">
                  <a href="www.linkedin.com/in/arkhaminferno" id="link">
                    LinkedIn
                  </a>
                </div>
                <div className="underline-link">
                  <a href="www.github.com/arkhaminferno" id="link">
                    {" "}
                    Github
                  </a>
                </div>
                <div className="underline-link">
                  <a href="gauravpsp@gmail.com" id="link">
                    Email{" "}
                  </a>{" "}
                </div>
              </div>
            </h6>
          </NavbarBrand>
        </Container>
      </Navbar>
    </div>
  );
}

export default Footer;
