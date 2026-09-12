import type React from "react";
import "./btn.css";
type BtnProps = React.ComponentProps<"button">;


export function Btn(props: BtnProps) {
  return <button className="btn" {...props}></button>;
}
