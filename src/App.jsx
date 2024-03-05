import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import WeatherCard from "./components/WeatherCard";
import axios from "axios";
import Loader from "./components/Loader";
import Error from "./components/Error";

function App() {
  const [coords, setCoords] = useState();
  const [weather, setWeather] = useState();
  const [temp, setTemp] = useState();
  const [isloading, setIsLoading] = useState(true)
 

  const success = (info) => {
    setCoords({
      lat: info.coords.latitude,
      lon: info.coords.longitude,
    });
  };
  const error = () =>{
    setIsLoading(false)
  }
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  useEffect(() => {
    if (coords) {
      const APIKEY = "10f03eba9aee68faa99ab8d4a966346c";
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${APIKEY}`;
      axios
        .get(url)
        .then((res) => {
          setWeather(res.data);
          const celsius = (res.data.main.temp - 273.15).toFixed(1);
          const fahrenheit = ((9 / 5) * celsius + 32).toFixed(1);
          setTemp({
            celsius,
            fahrenheit,
          });
        })
        .catch((err) => console.log(err))
        .finally(()=> setIsLoading(false))
    }
  }, [coords]);

  return (
    <div className="app">
    
      {

        isloading
        ?<Loader/>
        :(
         <WeatherCard temp={temp} weather={weather} />
        )
       

      }
     
    </div>
  );
}

export default App;
