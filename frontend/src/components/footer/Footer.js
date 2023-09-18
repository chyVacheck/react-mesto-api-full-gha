function Footer() {
  const data = new Date().getFullYear();
  return (
    <footer className="footer" lang="en">
      <p>© {data} Mesto</p>
    </footer>
  );
}

export default Footer;
