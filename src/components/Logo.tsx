import logo from "/logo.svg";

export default function Logo() {
  return (
    <a href="." className="logo">
      <img src={logo} alt="Logo" className="logo__img" />
    </a>
  );
}
