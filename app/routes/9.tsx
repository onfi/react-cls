import type { Route } from "./+types/home";
import { useState, useEffect } from "react";

export function meta({}: Route.MetaArgs) {
  return [
  ];
}

export default function() {
  const [render, setRender] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRender(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);


  return <div>
    <div style={{height: "100vh", backgroundColor: "lightgray"}}>ファーストビューにレイアウトシフトさせない</div>
    {render && (<div style={{height: "5px", backgroundColor: "black", color: "white"}}>中</div>)}
    <div style={{height: "50vh", backgroundColor: "yellow"}}>下</div>
  </div>;
}
