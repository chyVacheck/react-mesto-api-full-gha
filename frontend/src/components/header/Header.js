import headerLogo from './../../images/logo.svg';

function Header({ children }) {
  return (
    <header className="header" >
      <img
        src={headerLogo}
        className="header__logo"
        lang="en"
        alt="Mesto"
      />
      {children}
    </header>
  );
}

export default Header;
