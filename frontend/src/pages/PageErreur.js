import { useRouteError } from "react-router-dom";

function PageErreur() {
  const error = useRouteError();

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Désolé, la page que vous cherchez n'existe pas ou a été déplacée.</p>
      <p>
        Vous pouvez retourner à la <a href="/">page d'accueil</a> de notre site.
      </p>
      <p>
        <i>{error.message}</i>
      </p>
    </div>
  );
}

export default PageErreur;
