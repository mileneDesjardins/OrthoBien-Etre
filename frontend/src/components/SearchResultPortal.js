import ReactDOM from "react-dom";

const SearchResultPortal = ({ children }) => {
  const portalRoot = document.getElementById("search-result-portal");

  if (!portalRoot) {
    throw new Error("Portal root element not found");
  }

  return ReactDOM.createPortal(children, portalRoot);
};

export default SearchResultPortal;
