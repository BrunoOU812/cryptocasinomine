import React from "react";

export default function DepositHeader() {
  return (
    <section
      style={{
        backgroundColor: "var(--subheader)",
        padding: "20px 40px",
        position: "sticky",
        zIndex: 2,
      }}
    >
      <ul
        className="nav nav-tabs d-flex  justify-content-center "
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
            <span style={{ color: "white" }}>Dashboard</span>
          </button>
        </li>
        <li className="nav-item mx-4" role="presentation">
          <button
            className="nav-link"
            id="main-tab8"
            data-bs-toggle="tab"
            data-bs-target="#mainTab8"
            type="button"
            role="tab"
            aria-selected="false"
          >
            <span style={{ color: "white" }}>Deposit</span>
          </button>
        </li>
        <li className="nav-item mx-4" role="presentation">
          <button
            className="nav-link"
            id="main-tab9"
            data-bs-toggle="tab"
            data-bs-target="#mainTab9"
            type="button"
            role="tab"
            aria-selected="false"
          >
            <span style={{ color: "white" }}>Withdraw</span>
          </button>
        </li>
        <li className="nav-item mx-4" role="presentation">
          <button
            className="nav-link"
            id="main-tab10"
            data-bs-toggle="tab"
            data-bs-target="#mainTab10"
            type="button"
            role="tab"
            aria-selected="false"
          >
            <span style={{ color: "white" }}>Transfer</span>
          </button>
        </li>
        <li className="nav-item mx-4" role="presentation">
          <button
            className="nav-link"
            id="main-tab11"
            data-bs-toggle="tab"
            data-bs-target="#mainTab11"
            type="button"
            role="tab"
            aria-selected="false"
          >
            <span style={{ color: "white" }}>Support</span>
          </button>
        </li>
      </ul>
    </section>
  );
}
