import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import '../App.css';

const Profile = () => {

    const fetchUserByEmail = async (email) => {
        try {
          const response = await fetch(`http://localhost:3000/users/email/${email}`);
          if (!response.ok) {
            throw new Error('Failed to fetch user data');
          }
          const data = await response.json();
          return data;
        } catch (error) {
          console.error('Error fetching user data:', error);
          return null;
        }
      };
      
  const { user, isAuthenticated } = useAuth0();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchUserByEmail(user.email)
        .then((data) => setUserData(data))
        .catch((error) => console.error('Error fetching user data:', error));
    }
  }, [isAuthenticated, user]);

  if (!isAuthenticated) {
    return <div>Please log in to view your profile.</div>;
  }

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container profile-page">
      <h1 className="profile-title">Profile</h1>
      <div className="profile-info">
        <p><strong>Name:</strong> {userData.name}</p>
        <p><strong>Email:</strong> {userData.email}</p>
        {/* Add more user information as needed */}
      </div>
      {/* Add other relevant details or components */}
    </div>
  );
};

export default Profile;