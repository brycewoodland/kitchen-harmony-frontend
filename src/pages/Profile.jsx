import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useUsers } from "../hooks/useUser";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  const { getUserByEmail } = useUsers();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (isAuthenticated && user) {
      getUserByEmail(user.email)
        .then((data) => setUserData(data))
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, [isAuthenticated, user, getUserByEmail]);

  if (!isAuthenticated) {
    return <div>Please log in to view your profile.</div>;
  }

  if (!userData) {
    return <div style={{ padding: "10px" }}>Loading...</div>;
  }

  return (
    <div className="container profile-page">
      <h1 className="profile-title">Profile</h1>
      <div className="profile-info">
        <p>
          <strong>Name:</strong> {userData.fname} {userData.lname}
        </p>
        <p>
          <strong>Email:</strong> {userData.email}
        </p>
        {/* Add more user information as needed */}
      </div>
      {/* Add other relevant details or components */}
    </div>
  );
};

export default Profile;
