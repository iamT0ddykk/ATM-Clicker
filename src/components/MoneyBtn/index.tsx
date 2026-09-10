import type React from "react";

type MoneyBtnProps = React.ComponentProps<"button">;

export function MoneyBtn( props: MoneyBtnProps) {
  return <button {...props}>💵</button>;
}
