import React from "react";
import Container from "./general/Container";
import Games from "./casinoRelated/Games";
import BetsTable from "./casinoRelated/BetsTable";

export default function Casino() {
  return (
    <Container>
      <Games></Games>
      <BetsTable></BetsTable>
    </Container>
  );
}
