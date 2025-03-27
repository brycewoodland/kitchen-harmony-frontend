import '../App.css';

function AboutUs() {
  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">About Us</h1>
      
      <section className="about-section mb-5">
        <h2>Introduction</h2>
        <p>Welcome to Kitchen Harmony! We are dedicated to providing unique and delicious recipes to help you cook any meal quickly and easily.</p>
      </section>
      
      <section className="about-section mb-5">
        <h2>Our Story</h2>
        <p>Kitchen Harmony was founded in 2020 with the goal of making cooking accessible and enjoyable for everyone. Our journey began with a small blog and has grown into a comprehensive platform for food enthusiasts.</p>
      </section>
      
      <section className="about-section mb-5">
        <h2>Mission and Vision</h2>
        <p>Our mission is to inspire and empower people to cook delicious meals at home. We envision a world where everyone can enjoy the art of cooking and share it with their loved ones.</p>
      </section>
      
      <section className="about-section mb-5">
        <h2>Values</h2>
        <ul>
          <li>Integrity</li>
          <li>Innovation</li>
          <li>Customer Focus</li>
          <li>Quality</li>
        </ul>
      </section>
      
      <section className="about-section mb-5">
        <h2>Team</h2>
        <div className="team-grid">
          <div className="team-member text-center">
            <img src="path/to/photo.jpg" alt="Team Member" className="img-fluid rounded-circle mb-2" />
            <h5>John Doe</h5>
            <p>Founder & CEO</p>
          </div>
          <div className="team-member text-center">
            <img src="path/to/photo.jpg" alt="Team Member" className="img-fluid rounded-circle mb-2" />
            <h5>Jane Smith</h5>
            <p>Head Chef</p>
          </div>
          <div className="team-member text-center">
            <img src="path/to/photo.jpg" alt="Team Member" className="img-fluid rounded-circle mb-2" />
            <h5>Emily Johnson</h5>
            <p>Marketing Director</p>
          </div>
        </div>
      </section>
      
      <section className="about-section mb-5">
        <h2>Achievements and Milestones</h2>
        <p>We are proud to have been featured in top culinary magazines and have won several awards for our innovative recipes.</p>
      </section>
      
      <section className="about-section mb-5">
        <h2>Customer Testimonials</h2>
        <blockquote className="blockquote">
          <p className="mb-0">Kitchen Harmony has transformed the way I cook. The recipes are easy to follow and always turn out great!</p><br></br>
          <footer className="blockquote-footer">Happy Customer</footer>
        </blockquote>
      </section>
      
      <section className="about-section mb-5">
        <h2>Community Involvement</h2>
        <p>We believe in giving back to the community. Kitchen Harmony regularly participates in local food drives and charity events.</p>
      </section>
      
      <section className="about-section mb-5">
        <h2>Contact Information</h2>
        <p>If you have any questions or feedback, feel free to <a href="/contact">contact us</a>.</p>
      </section>
      
      <section className="about-section mb-5">
        <h2>Call to Action</h2>
        <p>Join our community of food lovers! <a href="/signup">Sign up</a> for our newsletter to receive the latest recipes and cooking tips.</p>
      </section>
    </div>
  );
}

export default AboutUs;