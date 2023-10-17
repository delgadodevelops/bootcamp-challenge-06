import React, { useState } from "react";
import Home from "./components/home";
import Navbar from "./components/navbar";

function App() {
  const [weatherData, setWeatherData] = useState([]);

  const handleCitySearch = (data) => {
    setWeatherData(data);
  };

  return (
    <div>
      <Navbar onCitySearch={handleCitySearch} />
      <Home weatherData={weatherData} />
    </div>
  );
}

export default App;
