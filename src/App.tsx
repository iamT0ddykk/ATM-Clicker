import "./styles/App.css";
import { Btn } from "./components/Btn";
import { useAtm } from "./utils";

function App() {
  const {
    dinheiroBanco,
    dinheiroFisico,
    prog,
    tempoRestante,
    tempoBoost,
    inputRef,
    dinheiroRef,
    handleWork,
    handleMoney,
    handleComprarBoost,
    handleTrabalhoLongo,
    handleAdd,
    handleRet,
  } = useAtm();

  return (
    <>
      <div className="side-bar">
        {" "}
        <Btn
          title="Comprar boost 2x por 500$ (dura 1 minuto)"
          onClick={handleComprarBoost}
          disabled={tempoBoost !== null}
        >
          ⚡
          <span className="recompensa-trabalho">
            {tempoBoost === null ? "2x · 500$" : `2x · ${tempoBoost}s`}
          </span>
        </Btn>
      </div>
      <h2 ref={dinheiroRef}>Seu Dinheiro Fisico : {dinheiroFisico}R$</h2>

      <div className="atm-container">
        <h1>Clickertalismo</h1>
        <h2>
          Seu Dinheiro do Banco :{" "}
          {dinheiroBanco.toString().startsWith("-") && (
            <span style={{ color: "#E47777" }}>{dinheiroBanco}$</span>
          )}
          {!dinheiroBanco.toString().startsWith("-") && (
            <span style={{ color: "#59B98A" }}>{dinheiroBanco}$</span>
          )}
        </h2>

        <div className="tela">
          <input
            type="number"
            placeholder="quanto retirar?"
            defaultValue={0}
            ref={inputRef}
          />

          <button className="retirar" onClick={handleRet}>
            Retirar
          </button>

          <button onClick={handleAdd}>Adicionar</button>
        </div>
      </div>

      <div className="buttons">
        <Btn title="Gerar dinheiro" onClick={handleMoney}>
          💵
        </Btn>

        <Btn title="Gerar " onClick={handleWork}>
          💼
          <progress
            className="barra-trabalho"
            value={prog}
            max={100}
          ></progress>
        </Btn>

        <Btn
          title="Trabalhar por 30 segundos para ganhar 100$"
          onClick={handleTrabalhoLongo}
          disabled={tempoRestante !== null}
        >
          ⏱️
          <span className="recompensa-trabalho">
            {tempoRestante === null ? "100$" : `${tempoRestante}s`}
          </span>
        </Btn>
      </div>
    </>
  );
}

export default App;
