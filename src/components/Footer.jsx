function Footer() {
    return (
        <footer className="footer bg-dark text-white text-center py-4">
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <h5>About Us</h5>
                        <p>Learn more about Kitchen Harmony and our mission to provide unique delicious recipes.</p>
                    </div>
                    <div className="col-md-4">
                        <h5>Quick Links</h5>
                        <ul className="list-unstyled">
                            <li><a href="#" className="text-white">Home</a></li>
                            <li><a href="#" className="text-white">Recipes</a></li>
                            <li><a href="#" className="textwhite">Contact</a></li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <h5>Follow Us</h5>
                        <a href="" className="text-white mx-2"></a>
                        <a href="" className="text-white mx-2"></a>
                        <a href="" className="text-white mx-2"></a>
                    </div>
                    <div className="row mt-3">
                        <div className="col-12">
                            <p>&copy; 2025 Kitchen Harmony. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;