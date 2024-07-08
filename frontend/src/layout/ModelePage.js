import Stack from "react-bootstrap/Stack";
import Navigation from "./Navigation";
import PiedDePage from "./PiedDePage";

function ModelePage({ children }) {
  return (
    <Stack gap={3} className="min-vh-100">
      <Navigation style={{ position: "absolute" }} />
      <div
        className="flex-grow-1"
        style={{ position: "relative", paddingTop: "80px" }}
      >
        {children}
      </div>

      <div
        id="search-result-portal"
        style={{ position: "absolute", top: 40, right: 350, zIndex: 1000 }}
      />
      <PiedDePage />
    </Stack>
  );
}

export default ModelePage;
