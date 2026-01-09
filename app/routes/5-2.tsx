import type { Route } from "./+types/home";
import { useState, useEffect } from "react";

export function meta({}: Route.MetaArgs) {
  return [
  ];
}

export default function() {
  const [render, setRender] = useState(false);

  const delayedSetRender = () => {
    setTimeout(() => {
      setRender(true);
    }, 500);
  }


  return <div>
    <div style={{height: "50vh", backgroundColor: "lightgray"}}>下側のエリアをクリックすると0.5秒後にレイアウトシフト</div>
    {render && <div style={{height: "30vh", backgroundColor: "black", color: "white"}}>中</div>}
    <div style={{height: "50vh", backgroundColor: "yellow"}} onClick={() => delayedSetRender()}>下</div>
  </div>;
}
