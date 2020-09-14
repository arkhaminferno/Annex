import React from "react";

import Navbar from "./component/navbar";
import "./App.css";
import Particles from "react-particles-js";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Searchbar from "./component/searchbar";
import Uniswapv2 from "./component/uniswapv2";
import Footer from "./component/footer.js";

function App() {
  return (
    <div className="App">
      <div
        style={{
          position: "absolute",
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
        }}
      >
        <Particles
          params={{
            particles: {
              number: {
                value: 50,
                density: {
                  enable: true,
                  value_area: 800,
                },
              },
            },
          }}
        />
      </div>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Searchbar} />
          <Route path="/uniswapv2" exact component={Uniswapv2} />
        </Switch>
      </BrowserRouter>{" "}
      <Footer />
    </div>
  );
}

export default App;
