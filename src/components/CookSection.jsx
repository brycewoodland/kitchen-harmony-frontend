import '../App.css';

function CookSection() {
  return (
    <div className="w-100" style={{ backgroundColor: '#f0f0f0', minHeight: '100vh', margin: 0, padding: 0 }}>
      <h1 className="text-center" style={{ marginTop: '100px', padding: '10px' }}>Cook any meal quickly and easily.</h1>
      <div className="container">
        <div className="row">
          <div className="col-md-4" style={{ marginTop: '100px' }}>
            <img src="https://placehold.co/400x300?text=placeholder&font=roboto" alt="Placeholder 1" className="img-fluid img-hover-zoom" />
          </div>
          <div className="col-md-4" style={{ marginTop: '100px' }}>
            <img src="https://placehold.co/400x300?text=placeholder&font=roboto" alt="Placeholder 2" className="img-fluid img-hover-zoom" />
          </div>
          <div className="col-md-4" style={{ marginTop: '100px' }}>
            <img src="https://placehold.co/400x300?text=placeholder&font=roboto" alt="Placeholder 3" className="img-fluid img-hover-zoom" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CookSection;