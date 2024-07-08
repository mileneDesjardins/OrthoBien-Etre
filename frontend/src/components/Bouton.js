import Button from "react-bootstrap/Button";

function Bouton({ variant, className, children }) {
  return (
    <Button type="submit" variant={variant} className={className}>
      {children}
    </Button>
  );
}

export default Bouton;
