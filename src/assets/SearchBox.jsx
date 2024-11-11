import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./SearchBox.css";
import { useState } from 'react';
import { red } from '@mui/material/colors';

export default function SearchBox({updateInfo}) {
    let [city, setCity] = useState("");
    let [error, setError] = useState(false);
    const API_URL = "https://api.openweathermap.org/data/2.5/weather";
    const API_KEY = "ed9da61e370bafa4b0aeec99b471a67d";

    let getWeatherInfo = async () => {
      try {
        let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
        let jasonResponse = await response.json();
        let result = {
            city: city,
            temp: jasonResponse.main.temp,
            tempMin: jasonResponse.main.temp_min,
            tempMax: jasonResponse.main.temp_max,
            humidity: jasonResponse.main.humidity,
            feelsLike: jasonResponse.main.feels_like,
            weather: jasonResponse.weather[0].description,
        };
        console.log(result);
        return result;
      }
      catch(err) {
        throw err;
      }
    };

    let handleChange = (evt) => {
        setCity(evt.target.value);
        setError(false); 
    };

    let handleSubmit = async (evt) => {
      try{
        evt.preventDefault();
        console.log(city);
        setCity("");
        let newInfo = await getWeatherInfo();
        updateInfo(newInfo);
      }
      catch(err){
        setError(true);
      }
    };

  return (
    <div className="SearchBox">
      <form onSubmit={handleSubmit}>
        <TextField id="City" label="City Name" variant="outlined" required value={city} onChange={handleChange}/>
        <br />
        <br />
        <Button variant="contained" type="submit">
          Search
        </Button>
        {error && <p style={{color: "red"}}> No such place exists!</p>}
      </form>
    </div>
  );
}