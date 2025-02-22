import '../App.css';

function Services() {
  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Our Services</h1>
      
      <section className="service-section mb-5">
        <h2>Recipe Collaboration</h2>
        <p>Collaborate with friends and family to create and share unique recipes. Our platform allows you to work together in real-time, making cooking a fun and social experience.</p>
      </section>
      
      <section className="service-section mb-5">
        <h2>Meal Planning</h2>
        <p>Plan your meals for the week with ease. Our meal planning tool helps you organize your recipes, create a balanced diet, and save time on meal preparation.</p>
      </section>
      
      <section className="service-section mb-5">
        <h2>Grocery List Building</h2>
        <p>Build your grocery list effortlessly. Our tool automatically generates a shopping list based on your selected recipes, ensuring you never forget an ingredient.</p>
      </section>
    </div>
  );
}

export default Services;