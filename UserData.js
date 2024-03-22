import React, { useState } from 'react';
import axios from 'axios';
import './UserData.css'; 

const UserData = () => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState([]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3001/userdata');
      setUserData(response.data.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDetailsClick = () => {
    fetchUserData();
  };

  return (
    <div className="user-data-container">
      <h2>User Data:</h2>
      <button onClick={handleDetailsClick} className="details-button">
        Details
      </button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="user-list">
          {userData.map((user, index) => (
            <li key={index} className="user-item">
              <strong>Name:</strong> {user.name}, <strong>Age:</strong> {user.age}, <strong>Weight:</strong> {user.weight}, <strong>Height:</strong> {user.height}, <strong>Location:</strong> {user.location}, <strong>BMI:</strong> {user.bmi_value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserData;
