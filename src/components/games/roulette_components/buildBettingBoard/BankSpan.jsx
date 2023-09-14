import React, { useEffect, useState } from "react";
import { useCasino } from "../Context";

export default function BankSpan() {
  const { bankValue } = useCasino();
  const [value, setValue] = useState(bankValue);
  useEffect(() => {
    setValue(bankValue);
  }, [bankValue]);
  return <div id="bankSpan">{"" + value.toLocaleString("en-GB") + ""}</div>;
}
