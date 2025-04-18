import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div className="container dashboard">
      <h1 className="dashboard-title">Dashboard</h1>
      <div className="row mt-4"> {/* Add margin-top to the row */}
        <div className="col-md-6 col-lg-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">My Recipes</h5>
              <p className="card-text">View and manage your personal recipes.</p>
              <Link to="/my-recipes" className="btn btn-primary btn-black">Go to My Recipes</Link>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Meal Plans</h5>
              <p className="card-text">Create and manage your meal plans.</p>
              <Link to="/mealplan" className="btn btn-primary btn-black">Go to Meal Plans</Link>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Shopping List</h5>
              <p className="card-text">View and manage your shopping lists.</p>
              <Link to="/shoppinglist" className="btn btn-primary btn-black">Go to Shopping List</Link>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Profile Settings</h5>
              <p className="card-text">Update your profile and account settings.</p>
              <a href="#" className="btn btn-primary btn-black">Go to Profile Settings</a> {/* Add btn-black class */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;