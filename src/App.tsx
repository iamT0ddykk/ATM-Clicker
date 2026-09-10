import { useEffect, useRef, useState } from "react";
import "./App.css";
import { MoneyBtn } from "./components/MoneyBtn";

function App() {
  const [dinheiroBanco, setDinheiroBanco] = useState(0);
  const [dinheiroFisico, setDinheiroFisico] = useState(100);

  const inputRef = useRef<HTMLInputElement>(null);
  const dinheiroRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {}, [dinheiroFisico]);
  return (
    <>
      <div className="buttons">
        <MoneyBtn onClick={() => setDinheiroFisico(dinheiroFisico + 1)} />
      </div>

      <h2 ref={dinheiroRef}>Seu Dinheiro Fisico : {dinheiroFisico}R$</h2>

      <div className="atm-container">
        <h1>Caixa Digital</h1>
        <h2>Seu Dinheiro do Banco : {dinheiroBanco}R$</h2>

        <div className="tela">
          <input
            type="number"
            placeholder="quanto retirar?"
            defaultValue={0}
            ref={inputRef}
          />

          <button
            className="retirar"
            onClick={() => {
              setDinheiroBanco(dinheiroBanco - Number(inputRef.current?.value));
              setDinheiroFisico(
                dinheiroFisico + Number(inputRef.current?.value),
              );
            }}
          >
            Retirar
          </button>

          <button
            onClick={() => {
              setDinheiroBanco(dinheiroBanco + Number(inputRef.current?.value));
              setDinheiroFisico(
                dinheiroFisico - Number(inputRef.current?.value),
              );
            }}
          >
            Adicionar
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
