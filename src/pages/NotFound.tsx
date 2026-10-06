import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  return (
    <main className="not-found">
      <p className="not-found__code" aria-hidden="true">
        404
      </p>
      <h1>Página não encontrada</h1>

      <Link className="not-found__link" to="/">
        Voltar para o caixa <span aria-hidden="true">&rarr;</span>
      </Link>
    </main>
  );
}

export default NotFound;
