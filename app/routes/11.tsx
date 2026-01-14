import type { Route } from "./+types/home";
import { useState, useEffect } from "react";

export function meta({}: Route.MetaArgs) {
  return [
  ];
}

export default function() {
  const [render, setRender] = useState(false);

  return <div>
    <div style={{height: "50vh", backgroundColor: "lightgray"}}>CSSアニメーションでガクガクしてもOK</div>
    <div style={{
      height: "30vh",
      backgroundColor: "black",
      color: "white",
      animation: "expandHeight 3s forwards"
    }}>
      中
      <style>{`
      @keyframes expandHeight {
        0% { height: 1vh; }
        100% { height: 30vh; }
      }
      `}</style>
    </div>
    <div style={{height: "50vh", backgroundColor: "yellow"}}>下</div>
  </div>;
}
