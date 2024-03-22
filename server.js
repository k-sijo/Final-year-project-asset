const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'food_recommendation_system',
});

db.connect();

app.post('/addUser', (req, res) => {
  const userData = req.body;
  const sql = 'INSERT INTO users SET ?';

  db.query(sql, userData, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error saving data to the database');
    } else {
      const userId = result.insertId;
      const { height, weight } = userData;
      const bmiValue = calculateBMI(height, weight);

      const bmiSql = 'INSERT INTO bmi (user_id, bmi_value) VALUES (?, ?)';
      db.query(bmiSql, [userId, bmiValue], (bmiErr) => {
        if (bmiErr) {
          console.error(bmiErr);
          res.status(500).send('Error saving BMI data to the database');
        } else {
          res.status(200).send('Data and BMI saved successfully');
        }
      });
    }
  });
});

function calculateBMI(height, weight) {
  // Implement your BMI calculation logic here
  const heightInMeters = height / 100; // Convert height to meters
  const bmiValue = weight / (heightInMeters * heightInMeters);
  return bmiValue.toFixed(2);
}

app.get('/getBMI/:userId', (req, res) => {
  const userId = req.params.userId;
  const sql = 'SELECT * FROM bmi WHERE user_id = ?';

  db.query(sql, userId, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error fetching BMI data from the database');
    } else {
      res.status(200).json(result);
    }
  });
});


app.get('/userdata', (req, res) => {
  const query = `
    SELECT users.name, users.age, users.weight, users.height, users.location, bmi.bmi_value
    FROM users
    INNER JOIN bmi ON users.id = bmi.user_id
  `;
  
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error retrieving user data:', error);
      res.status(500).json({ success: false, message: 'Error retrieving user data' });
    } else {
      res.json({ success: true, data: results });
    }
  });
});



app.get('/food-recommendations', (req, res) => {
  const query = `
    SELECT foods.food_name,foods.type,foods.calories,foods.food_type,foods.location
    FROM foods
  `;
  
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error retrieving user data:', error);
      res.status(500).json({ success: false, message: 'Error retrieving user data' });
    } else {
      res.json({ success: true, data: results });
    }
  });
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
