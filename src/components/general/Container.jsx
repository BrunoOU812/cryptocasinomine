import React from "react";
export default function Container(props) {
  return (
    <section>
      <div className="container">{props.children}</div>
    </section>
  );
}
