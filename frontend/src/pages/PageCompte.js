import { Stack } from "react-bootstrap";
import Onglets from "../components/Onglets";
import ModelePage from "../layout/ModelePage";

function PageCompte() {
  return (
    <ModelePage>
      <Stack
        className="d-flex flex-column align-items-center justify-content-center"
        gap={4}
      >
        <h1 className="mb-2">Votre compte</h1>
        <Onglets />
      </Stack>
    </ModelePage>
  );
}

export default PageCompte;
