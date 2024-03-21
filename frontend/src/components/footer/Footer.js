function Footer() {
  const data = new Date().getFullYear();
  return (
    <footer className="footer" lang="en">
      <p>© 2022 - {data} Mesto</p>
    </footer>
  );
}

export default Footer;
