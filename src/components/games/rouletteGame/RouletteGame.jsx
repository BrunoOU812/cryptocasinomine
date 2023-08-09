import React from "react";

export default function RouletteGame() {
  return (
    <div
      style={{
        height: "500px",
        overflow: "hidden",
        minWidth: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {/* El iframe que carga el juego */}
      <iframe
        title="Roulette Game"
        src="https://elsazonrestaurant.com/casino/roulette/Rouleta/"
        // src="file:///C:/Users/Bruno/Desktop/Rouleta/index.html"
        style={{
          width: "1200px",
          height: "1000px", // Altura suficiente para mostrar la parte inferior del juego
          border: "none",
          transform: "translateY(-500px)", // Desplaza el contenido hacia arriba
        }}
        scrolling="no" // Deshabilita las barras de desplazamiento en el iframe
      />
    </div>
  );
}
