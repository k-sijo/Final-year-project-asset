import React, { useState} from 'react';
import axios from 'axios';
import './RecommendationForm.css'; // Import the CSS file

const RecommendationForm = () => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState([]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3001/food-recommendations');
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
      <h2>recommendation:</h2>
      <button onClick={handleDetailsClick} className="details-button">
        Reffer Food For Me
      </button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="user-list">
          {userData.map((foods, index) => (
            <li key={index} className="user-item">
              <strong>Name:</strong> {foods.food_name}, <br /> <strong>Type:</strong> {foods.type},  <br /> <strong>calories:</strong> {foods.calories}, <br /> <strong>food_type</strong> {foods.food_type},  <br /> <strong>Location:</strong> {foods.location}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecommendationForm;
