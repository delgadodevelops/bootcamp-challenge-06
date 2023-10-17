import "animate.css";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import "./home.css";

function Home() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const apiKey = "7da2a05016a781d4b33e98e2ad107397"; // Replace with your OpenWeatherMap API key

  const getCurrentDateFormatted = () => {
    return dayjs().format("MMMM D, YYYY");
  };

  const fetchWeatherData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      // Filter the data for the next 5 days with one timestamp per day
      const next5Days = [];
      let currentDate = null;

      for (let day of data.list) {
        const dayDate = dayjs.unix(day.dt).format("YYYY-MM-DD");

        if (currentDate !== dayDate) {
          const temperatureFahrenheit = ((day.main.temp - 273.15) * 9) / 5 + 32;

          next5Days.push({
            ...day,
            main: {
              ...day.main,
              temp: temperatureFahrenheit,
            },
          });

          currentDate = dayDate;
        }
      }

      setWeatherData({
        ...data,
        list: next5Days,
      });

      setLoading(false);
    } catch (error) {
      setError("Error fetching weather data");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (city) {
      fetchWeatherData();
    }
  }, [city]);

  return (
    <div className="bg-blue-100 h-screen">
      <div className="font-archivo p-5 mb-5">
        <h3 className="text-5xl text-center font-bold py-1 bg-gradient-text text-transparent bg-clip-text bg-gradient-to-t from-sky-400 to-blue-500">
          5 Day Weather Forecast
        </h3>

        {/* Display current date using dayjs */}
        <p className="text-lg text-center text-gray-600">
          {getCurrentDateFormatted()}
        </p>

        <div className="flex justify-center items-center mb-2">
          <form
            className=" w-96 "
            onSubmit={(e) => {
              e.preventDefault();
              fetchWeatherData();
            }}
          >
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only"
            >
              Search
            </label>
            <div className="relative my-6">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="default-search"
                className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-2xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter City Here ..."
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <button
                type="submit"
                className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-2xl text-sm px-4 py-2"
              >
                Search
              </button>
            </div>
          </form>
        </div>

        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {weatherData && (
          <>
            <div className="flex justify-center animate__animated animate__fadeInLeft">
              {/* Display current weather */}
              <div className="card p-5 w-48 mb-5 rounded-3xl shadow shadow-xl border border-2 border-blue-400 bg-gradient  bg-gradient-to-t from-sky-400 to-blue-500">
                <div className="card-body p-2.5">
                  <h5 className="text-center font-bold text-xl text-white">
                    Todays Weather
                  </h5>
                  <img
                    src={`http://openweathermap.org/img/wn/${weatherData.list[0].weather[0].icon}.png`}
                    alt="Weather Icon"
                    className="mx-auto"
                  />
                  <p className="text-center text-blue-900 font-bold text-lg mb-2 ">
                    {weatherData.list[0].main.temp.toFixed(0)}°F
                  </p>
                  <p className="text-center text-white font-bold bg-gradient bg-clip bg-gradient-to-t from-orange-500 to-yellow-300 rounded-full my-2 shadow shadow-md ">
                    Pending
                  </p>
                  <p className="text-center text-sm text-gray-100">
                    Wind: {weatherData.list[0].wind.speed} m/s
                  </p>
                  <p className="text-center text-sm text-gray-100">
                    Humidity: {weatherData.list[0].main.humidity}%
                  </p>
                </div>
              </div>
            </div>

            <div className="container mx-auto p-5 animate__animated animate__fadeInUpBig">
              {/* Display 5-day forecast with one card per day */}
              <div className="flex justify-between">
                {weatherData.list.slice(0, 5).map((day, index) => {
                  const dayName = dayjs.unix(day.dt).format("dddd");
                  const date = dayjs.unix(day.dt).format("MMMM D");
                  const weatherDescription = day.weather[0].description; // Extract the weather description

                  return (
                    <div
                      className="card p-5 w-48 mb-5  bg-blue-100 rounded-3xl shadow shadow-xl border border-2 border-blue-200 hover:bg-blue-200 ease-in-ease-out duration-700 "
                      key={index}
                    >
                      <div className="card-body p-2.5">
                        <h5 className="text-center font-bold text-xl text-blue-400">
                          {dayName}
                        </h5>
                        <p className="text-center text-gray-400 text-sm">
                          {date}
                        </p>
                        <img
                          src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                          alt="Weather Icon"
                          className="flex mx-auto"
                        />
                        <p className="text-center text-blue-900 font-bold text-lg ">
                          {day.main.temp.toFixed(0)}°
                        </p>
                        <p className="text-center text-white font-bold bg-gradient bg-clip bg-gradient-to-t from-orange-500 to-yellow-300 rounded-full my-2 shadow shadow-md ">
                          {weatherDescription}
                        </p>{" "}
                        {/* Display the weather description */}
                        <p className="text-center text-sm text-gray-400">
                          Wind: {day.wind.speed} m/s
                        </p>
                        <p className="text-center text-sm text-gray-400">
                          Humidity: {day.main.humidity}%
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
