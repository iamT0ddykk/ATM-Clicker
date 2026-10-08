import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { playSound } from "../func/play-money-sound";

export function useAtm() {
  const [dinheiroBanco, setDinheiroBanco] = useState(0);
  const [dinheiroFisico, setDinheiroFisico] = useState(0);
  const [prog, setProg] = useState(0);
  const [tempoRestante, setTempoRestante] = useState<number | null>(null);
  const [tempoBoost, setTempoBoost] = useState<number | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const dinheiroRef = useRef<HTMLHeadingElement>(null);
  const boostAtivoRef = useRef(false);

  function deposito(amt: number, msg: string) {
    const valorRecebido = amt * (tempoBoost !== null ? 2 : 1);
    setDinheiroFisico((dinheiroAtual) => dinheiroAtual + valorRecebido);

    toast.success(tempoBoost !== null ? `${msg} (2x: ${valorRecebido}$)` : msg);
  }

  function handleWork() {
    setProg(prog + 10);
    if (prog >= 100) {
      deposito(20, "Seu trabalho rendeu 20$");

      setProg(0);
      playSound();
    }
  }

  function handleMoney() {
    playSound();

    setDinheiroFisico(
      (dinheiroAtual) => dinheiroAtual + (tempoBoost !== null ? 2 : 1),
    );
  }

  function handleComprarBoost() {
    if (tempoBoost !== null) return;
    if (dinheiroFisico < 500) {
      toast.error("Você precisa de 500$ para comprar o boost");
      return;
    }

    setDinheiroFisico((dinheiroAtual) => dinheiroAtual - 500);
    boostAtivoRef.current = true;
    setTempoBoost(60);
    toast.success("Boost 2x ativado por 1 minuto!");
  }

  function handleTrabalhoLongo() {
    if (tempoRestante !== null) return;

    setTempoRestante(30);
  }

  function handleAdd() {
    setDinheiroBanco(dinheiroBanco + Number(inputRef.current?.value));
    setDinheiroFisico(dinheiroFisico - Number(inputRef.current?.value));

    toast.success(
      `Você adicionou ${dinheiroBanco + Number(inputRef.current?.value)}`,
    );
  }

  function handleRet() {
    setDinheiroBanco(dinheiroBanco - Number(inputRef.current?.value));
    setDinheiroFisico(dinheiroFisico + Number(inputRef.current?.value));

    toast.success(`Você retirou ${inputRef.current?.value}`);
  }

  useEffect(() => {
    if (tempoRestante === null) return;

    const timer = window.setTimeout(() => {
      if (tempoRestante === 1) {
        setTempoRestante(null);
        const recompensa = boostAtivoRef.current ? 200 : 100;
        setDinheiroFisico((dinheiroAtual) => dinheiroAtual + recompensa);
        playSound();

        toast.success(`Seu trabalho rendeu ${recompensa}$`);
      } else {
        setTempoRestante(tempoRestante - 1);
      }
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [tempoRestante]);

  useEffect(() => {
    if (tempoBoost === null) return;

    const timer = window.setTimeout(() => {
      if (tempoBoost === 1) {
        boostAtivoRef.current = false;
        setTempoBoost(null);
      } else {
        setTempoBoost(tempoBoost - 1);
      }
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [tempoBoost]);

  return {
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
  };
}
