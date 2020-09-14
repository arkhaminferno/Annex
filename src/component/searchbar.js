import React, { Component } from "react";
import {
  InputGroup,
  Container,
  FormControl,
  Button,
  Spinner,
} from "react-bootstrap";
import Token from "./token";

import axios from "axios";

const CoinGecko = require("coingecko-api");
const CoinGeckoClient = new CoinGecko();
const Web3 = require("web3");
const web3 = new Web3(
  "https://mainnet.infura.io/v3/c5ccb450c8e745b6a2563adec1975f12"
);

const etherscanapikey = "7NP5A5PH9TQJ8ZV4P3YPCB4MACD9MMHFW6";

export class searchbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchdata: " ",
      coindata: {},
      loaded: false,
      dataloaded: false,
      keyaddress: "",
      keyprice: "",
      keyABI: [],
      liquidity: 0,
    };
  }

  callApi = async () => {
    try {
      let data = await CoinGeckoClient.simple.fetchTokenPrice({
        contract_addresses: this.state.searchdata,
        vs_currencies: "eth",
      });

      let key = Object.keys(data.data);
      let value = Object.values(data.data)[0]["eth"];

      this.setState({
        ...this.state,
        conidata: data.data,
        keyaddress: key,
        keyprice: value,
        loaded: true,
      });
    } catch (e) {
      console.log(e);
    }
  };
  Handlechange = (event) => {
    this.setState({ ...this.state, searchdata: event.target.value.trim() });
  };

  getABI = () => {
    axios
      .get(
        `https://api.etherscan.io/api?module=contract&action=getsourcecode&address=${this.state.searchdata}&apikey=${etherscanapikey};`
      )
      .then((data) => {
        let ABI = data.data.result[0].ABI;
        this.getTotalLiquidity(JSON.parse(ABI));
        this.setState({ ...this.state, keyABI: ABI });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getTotalLiquidity = async (abi) => {
    let address = String(this.state.keyaddress);
    var contract = new web3.eth.Contract(abi, address);
    const totalliquidity = await contract.methods.totalSupply().call();
    this.setState({
      ...this.state,
      dataloaded: true,
      loaded: false,
      liquidity: totalliquidity,
    });
  };

  render() {
    return (
      <Container className="searcbar-div">
        <label htmlFor="basic-url" id="label">
          Enter Contract Address
        </label>
        <h6 id="link">
          Note: This Page uses Coingecko API for ERC20 contract Data, if you
          want to query directly from Uniswap Contract then use the above
          Navlink
        </h6>
        <InputGroup className="mb-3">
          <FormControl
            id="basic-url"
            aria-describedby="basic-addon3"
            placeholder="Enter ERC20 token address. e.g:0x6b175474e89094c44da98b954eedeac495271d0f"
            onChange={this.Handlechange}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <Button
            id="search-button"
            className="ml-auto text-uppercase"
            onClick={() => {
              this.callApi();
              this.getABI();
            }}
          >
            Submit
          </Button>
        </InputGroup>
        {/* {this.state.loaded === false ? null : this.state.loaded ? (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        ) : this.state.dataloaded ? (
          <Token
            address={this.state.keyaddress}
            price={this.state.keyprice}
            totalliquidity={this.state.liquidity}
          />
        ) : null} */}

        {this.state.dataloaded ? (
          <Token
            address={this.state.keyaddress}
            price={this.state.keyprice}
            totalliquidity={this.state.liquidity}
          />
        ) : null}

        {this.state.loaded ? (
          <Spinner animation="border" role="status" variant="light">
            <span className="sr-only">Loading...</span>
          </Spinner>
        ) : null}
      </Container>
    );
  }
}

export default searchbar;
