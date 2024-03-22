import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserForm.css'; 

const UserForm = () => {
  const [userData, setUserData] = useState({
    name: '',
    age: '',
    height: '',
    weight: '',
    location: '',
    goal: '',
  });

  const [userId, setUserId] = useState(null);
  const [bmiValue, setBmiValue] = useState(null);

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/addUser', userData);
      console.log('Data saved successfully');
      // Set the userId state after successful submission
      setUserId(response.data.userId);
    } catch (error) {
      console.error('Error saving data to the database:', error);
    }
  };

  useEffect(() => {
    // Fetch BMI data for the user after submitting the form
    const fetchBMI = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/getBMI/${userId}`);
        console.log('BMI Data:', response.data);
        // Update state or UI as needed
        if (response.data.length > 0) {
          const retrievedBmiValue = response.data[0].bmi_value;
          console.log('Retrieved BMI Value:', retrievedBmiValue);
          setBmiValue(retrievedBmiValue);
        }
      } catch (error) {
        console.error('Error fetching BMI data:', error);
      }
    };

    // Call the fetchBMI function only if userId is defined
    if (userId !== null) {
      fetchBMI();
    }
  }, [userId]);

  return (
    <div className="user-form-container">
      <form onSubmit={handleSubmit} className="user-form">
        <h1>User Form</h1>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" name="name" onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Age:</label>
          <input type="number" name="age" onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Height:</label>
          <input type="number" name="height" onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Weight:</label>
          <input type="number" name="weight" onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Location:</label>
          <input type="text" name="location" onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Goal:</label>
          <input type="text" name="goal" onChange={handleInputChange} />
        </div>

        <button type="submit">Submit</button>
      </form>
      {bmiValue !== null && (
        <div className="bmi-result">
          <h2>BMI Value: {bmiValue}</h2>
        </div>
      )}
    </div>
  );
};

export default UserForm;
