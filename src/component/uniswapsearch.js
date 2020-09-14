import React, { Component } from "react";
import {
  InputGroup,
  Container,
  FormControl,
  Button,
  Spinner,
} from "react-bootstrap";
import Table from "./table";
import axios from "axios";
const Web3 = require("web3");
const web3 = new Web3(
  "https://mainnet.infura.io/v3/c5ccb450c8e745b6a2563adec1975f12"
);
// Uniswap factory contract address
const factoryaddress = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f";

const wethaddress = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";

const etherscanapikey = "7NP5A5PH9TQJ8ZV4P3YPCB4MACD9MMHFW6";

// uniswap factory contract ABI

const uniswapfactoryABI = [
  {
    inputs: [
      { internalType: "address", name: "_feeToSetter", type: "address" },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "token0",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "token1",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "pair",
        type: "address",
      },
      { indexed: false, internalType: "uint256", name: "", type: "uint256" },
    ],
    name: "PairCreated",
    type: "event",
  },
  {
    constant: true,
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "allPairs",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "allPairsLength",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "tokenA", type: "address" },
      { internalType: "address", name: "tokenB", type: "address" },
    ],
    name: "createPair",
    outputs: [{ internalType: "address", name: "pair", type: "address" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "feeTo",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "feeToSetter",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "address", name: "", type: "address" },
    ],
    name: "getPair",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [{ internalType: "address", name: "_feeTo", type: "address" }],
    name: "setFeeTo",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "_feeToSetter", type: "address" },
    ],
    name: "setFeeToSetter",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class uniswapsearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchdata: "",
      erc20address: "",
      erc20ABI: [],
      totalliquidity: 0,
      pricepertoken: 0,
      everythingloaded: false,
      loaded: false,
    };
  }

  callApi = async () => {
    try {
      const factorycontractinstance = new web3.eth.Contract(
        uniswapfactoryABI,
        factoryaddress
      );

      const pairdata = await factorycontractinstance.methods
        .getPair(this.state.searchdata, wethaddress)
        .call();
      this.getABI(pairdata);
      this.setState({
        ...this.state,
        erc20address: pairdata,
        everythingloaded: true,
      });
    } catch (err) {
      console.log(err);
    }
  };

  getABI = (address) => {
    axios
      .get(
        `https://api.etherscan.io/api?module=contract&action=getsourcecode&address=${address}&apikey=${etherscanapikey};`
      )
      .then((data) => {
        let ABI = data.data.result[0].ABI;
        this.getTotalLiquidity(JSON.parse(ABI));
        this.setState({ ...this.state, erc20ABI: ABI });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getTotalLiquidity = async (abi) => {
    try {
      let address = this.state.erc20address;
      const contractinstance = new web3.eth.Contract(abi, address);

      const totalliquidity = await contractinstance.methods
        .totalSupply()
        .call();
      const Reserves = await contractinstance.methods.getReserves().call();
      let ethpriceperToken = Reserves["_reserve1"] / Reserves["_reserve0"];

      this.setState({
        ...this.state,
        pricepertoken: ethpriceperToken,
        totalliquidity: totalliquidity,
        everythingloaded: false,
        loaded: true,
      });
    } catch (err) {
      console.log(err);
    }
  };

  Handlechange = (event) => {
    this.setState({ ...this.state, searchdata: event.target.value.trim() });
  };
  render() {
    return (
      <Container className="searcbar-div">
        <img src="/uniswap.svg" alt="React Bootstrap logo" />
        <label htmlFor="basic-url" id="label">
          Enter Contract Address
        </label>
        <InputGroup className="mb-3">
          <FormControl
            id="basic-url"
            aria-describedby="basic-addon3"
            placeholder="Enter ERC20 token address to get Deatils on uniswap "
            onChange={this.Handlechange}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <Button
            id="search-button"
            className="ml-auto text-uppercase"
            onClick={this.callApi}
          >
            Submit
          </Button>
        </InputGroup>

        {this.state.loaded ? (
          <Table
            address={this.state.erc20address}
            pricepertoken={this.state.pricepertoken}
            totalliquidity={this.state.totalliquidity}
          />
        ) : null}

        {this.state.everythingloaded ? (
          <Spinner animation="border" role="status" variant="light">
            <span className="sr-only">Loading...</span>
          </Spinner>
        ) : null}
      </Container>
    );
  }
}

export default uniswapsearch;
