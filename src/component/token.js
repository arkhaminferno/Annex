import React from "react";
import { Table } from "react-bootstrap";
function Token(props) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Adress</th>
          <th>Price Per Token</th>
          <th>Liquidty</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{props.address} </td>
          <td>{props.price} WETH/ETH</td>
          <td>{props.totalliquidity} Tokens</td>
        </tr>
      </tbody>
    </Table>
  );
}

export default Token;
