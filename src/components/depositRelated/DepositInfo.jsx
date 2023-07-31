import React from "react";

export default function DepositInfo() {
  return (
    <div className="col" style={{ borderRadius: "5px", margin: "5vh 0" }}>
      <section
        style={{
          backgroundColor: "#283968",
          padding: "20px 40px",
          position: "sticky",
          top: "73px",
          zIndex: 0,
        }}
      >
        <ul
          className="nav nav-tabs d-flex  justify-content-center  "
          id="myTabmain"
          role="tablist"
        >
          <li className="nav-item mx-4 " role="presentation">
            <button
              className="nav-link"
              id="main-tab7"
              data-bs-toggle="tab"
              data-bs-target="#mainTab7"
              type="button"
              role="tab"
              aria-selected="false"
            >
              <h4 style={{ color: "white" }}>Info</h4>
            </button>
          </li>
        </ul>
      </section>
      <div style={{ backgroundColor: "var(--slidebox)", padding: "20px 50px" }}>
        <p className="" style={{ color: "white", fontSize: "1em" }}>
          Depositing funds in your casino account is easy
          <br />
          <br />
          We'll connect you with one of our moderators who will accept the gold
          from you adds it to your account. After that, your funds should appear
          in your account immediately.
          <br />
          <br />
          We'll open a ticket for you that allows you to track this transaction.
          <br />
          <br />
          Theres is NO fee on deposits and whitdrawals, 0%
        </p>
      </div>
    </div>
  );
}
