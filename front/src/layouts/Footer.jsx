export default function Footer() {
  return (
    <footer className="footer">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6">
            {new Date().getFullYear()} © Camara de Comercio Industria y Turismo de Ancash.
          </div>
          <div className="col-sm-6">
            <div className="text-sm-end d-none d-sm-block">
              Design & Giraldo AP
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
