import '../comp/footer.css';  

const footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© {new Date().getFullYear()} UniTruck. Todos os direitos reservados.</p>
        <p>Contato: contato@unitruck.com | Tel: (00) 1234-5678</p>
        <p>Siga-nos nas redes sociais: 
          <a href="https://facebook.com/unitruck" target="_blank" rel="noopener noreferrer"> Facebook</a> | 
          <a href="https://instagram.com/unitruck" target="_blank" rel="noopener noreferrer"> Instagram</a> | 
          <a href="https://twitter.com/unitruck" target="_blank" rel="noopener noreferrer"> Twitter</a>
        </p>
      </div>
    </footer>
  );
}
export default footer;