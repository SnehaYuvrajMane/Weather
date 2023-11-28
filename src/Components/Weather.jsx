import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Styles.css";

function Main() {
  const [forecastData, setForecastData] = useState(null);
  const [city, setCity] = useState("Pune");
  const [location, setLocation] = useState("");
  const apiKey = "0e0aa7ec65eafabcffdda376fcb7c4c1";

  const fetchData = async () => {
    try {
      if (city) {
        // Fetch 5-day forecast data
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&cnt=5`
        );
        setLocation({
          city: response.data.name,
          country: response.data.sys.country,
        });

        const data = await axios.get(
          `https://api.openweathermap.org/data/3.0/onecall?lat=${response.data.coord.lat}&lon=${response.data.coord.lon}&exclude=hourly,minutely&appid=${apiKey}&units=metric&cnt=4`
        );
        setForecastData(data.data);
        console.log(data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="weather">
      {forecastData && (
        <div>
          <div className="header__class">
            <div className="loc">
              <h1>
                {location.city},{location.country}
              </h1>
              <p>
                {forecastData.lat}N& {forecastData.lon}E
              </p>
            </div>
            <div>
             
                <input
                  type="text"
                  placeholder="Enter city name"
                  value={city}
                  onChange={(e) => {setCity(e.target.value)
                    fetchData();
                  }}
                />
           
            </div>
          </div>
          <div className="weather__card">
            <div className="card labels">
              <div className="card-data label-card">
                <p>High Temperature</p>
                <p>Low Temperature</p>
                <p>Humidity</p>
                <p>Sunrise</p>
                <p>Sunset</p>
              </div>
            </div>
            {forecastData.daily.map((data) => (
              <div key={data.dt} className="card">
                <h2>{new Date(data.dt * 1000).toLocaleDateString()}</h2>
                <div className="card-data">
                    <div className="fore">

                    <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`} alt="icon" />
                    <p> {data.weather[0].main}</p>
                    </div>
                  <hr className="rule" />
                    

                  <p> {data.temp.max}°C</p>
                  <p> {data.temp.min}°C</p>
                  <p> {data.humidity}%</p>
                  <p> {new Date(data.sunrise * 1000).toLocaleTimeString()}</p>
                  <p> {new Date(data.sunset * 1000).toLocaleTimeString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Main;
