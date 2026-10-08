import { useState } from "react";
import "./styles/App.css";
import { Btn } from "./components/Btn";
import { useAtm } from "./utils";
import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";

function AtmPage() {
  const [cassinoAberto, setCassinoAberto] = useState(false);
  const [valorAposta, setValorAposta] = useState(10);
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
    simbolosCaixa,
    girando,
    resultadoAposta,
    handleAposta,
  } = useAtm();

  if (cassinoAberto) {
    return (
      <main className="casino-page">
        <header className="casino-header">
          <button
            className="casino-back"
            onClick={() => setCassinoAberto(false)}
          >
            <span aria-hidden="true">&larr;</span> Voltar ao caixa
          </button>
          <p>Saldo físico: {dinheiroFisico}$</p>
        </header>

        <section className="slot-machine" aria-labelledby="slot-title">
          <div className="slot-heading">
            <h1 id="slot-title">Cassino</h1>
          </div>

          <div
            className={`slot-reels ${girando ? "is-spinning" : ""}`}
            aria-label={`Símbolos: ${simbolosCaixa.join(" ")}`}
            aria-live="polite"
          >
            {simbolosCaixa.map((simbolo, index) => (
              <div className="slot-reel" key={`${index}-${simbolo}`}>
                {simbolo}
              </div>
            ))}
          </div>

          <p className="slot-result" role="status">
            {girando ? "Girando..." : resultadoAposta || "Faça sua aposta"}
          </p>

          <div className="slot-controls">
            <label htmlFor="slot-bet">Valor da aposta</label>
            <div className="slot-bet-control">
              <span aria-hidden="true">$</span>
              <input
                id="slot-bet"
                type="number"
                min="1"
                step="1"
                value={valorAposta}
                onChange={(event) => setValorAposta(Number(event.target.value))}
                disabled={girando}
              />
              <button
                className="slot-spin"
                onClick={() => handleAposta(valorAposta)}
                disabled={girando || dinheiroFisico <= 0}
              >
                {girando ? "Girando..." : "Girar"}
              </button>
            </div>
          </div>

          <p className="slot-paytable">
            Trinca: paga 10x · Dupla: paga 2x · Sem combinação: perde a aposta
          </p>
        </section>
      </main>
    );
  }

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

        <button className="casino-entry" onClick={() => setCassinoAberto(true)}>
          <span aria-hidden="true">🎰</span> Abrir cassino
        </button>

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

function App() {
  return (
    <Routes>
      <Route path="/" element={<AtmPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
