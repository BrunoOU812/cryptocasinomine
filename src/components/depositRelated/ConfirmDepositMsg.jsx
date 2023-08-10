import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ConfirmDepositMsg({ depositResponse }) {
  const [customerData, setCustomerData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/customers?customer_id=${depositResponse.customer_id}`
        );
        setCustomerData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [depositResponse.customer_id]);

  return (
    <div
      className="deposit__complate"
      style={{
        margin: 0,
        textAlign: "left",
        marginBottom: "30px",
        color: "white",
        padding: "20px",
      }}
    >
      <h5>Test User</h5>
      <hr />
      {/* <p>to: {customerData && JSON.stringify(customerData.data[0].name)}</p> */}
      <p>
        {depositResponse.comment && depositResponse.comment}
        {depositResponse.comment && <br />}
        {depositResponse.comment && <br />}
        <span style={{ fontWeight: "bold" }}>To:&nbsp;</span>{" "}
        {depositResponse.to},
        <br />
        {/* <span style={{ fontWeight: "bold" }}>
          Customer_id:&nbsp;
        </span>{" "}
        {depositResponse.customer_id}, <br />{" "} */}
        <span style={{ fontWeight: "bold" }}>Value:&nbsp;</span> $
        {depositResponse.value}
        ,
        <br /> <span style={{ fontWeight: "bold" }}>Datetime:&nbsp;</span>{" "}
        {depositResponse.datetime}, <br />{" "}
        {/* <span style={{ fontWeight: "bold" }}>Crypto_id:&nbsp;</span>{" "}
        {depositResponse.crypto_id},<br />{" "} */}
        <span style={{ fontWeight: "bold" }}>Status:&nbsp;</span>{" "}
        {depositResponse.status},
      </p>
    </div>
  );
}
