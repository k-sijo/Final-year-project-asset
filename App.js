import React from 'react';
import UserForm from './component/UserForm';
import UserData from './component/UserData';
import RecommendationForm from './component/RecommendationForm';
import DashboardHeading from './component/Dashboard/DashboardHeading';


function App() {
  return (
    <div className="App">
      <DashboardHeading />
      <UserForm />
      <UserData />
      <RecommendationForm />
    </div>
  );
}

export default App;