function Contact() {
    return (
        <div className="container text-center my-5 w-50">
            <h2>Contact Us</h2>
            <p>If you have any questions or feedback, feel free to reach out to us.</p>
            <form action="">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" />
                </div>
                <div className="mb-3">
                    <label htmlFor="message" className="form-label"></label>
                    <textarea id="message" className="form-control" rows="3"></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Contact;