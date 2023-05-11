import axios from "axios";
import { useEffect, useState } from "react";
import { FaSearchLocation } from "react-icons/fa";
export default function Weather() {
  const [data, setData] = useState(null);
  const [text, setText] = useState("Ha Noi");
  const [error, setError] = useState("");
  const getData = async () => {
    const apikey = "e0ddc538b3415427caeb7901218a30dd";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&units=metric&appid=${apikey}`;
    axios
      .get(url)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        if (error.response.status == "404") {
          setError("invalid city name");
        }
      });
  };
  useEffect(() => {
    getData();
  }, []);
  console.log(data);
  return (
    <div className="con">
    <div className="container">
    <h1>WEATHER</h1>
      <div className="inputlocal">

        <input
          type="text"
          value={text}
          placeholder="Enter Location"
          onChange={(e) => setText(e.target.value)}
          onKeyPress={(e) => {
            if (e.key == "Enter" && text) {
              getData();
              setText("");
            }
          }}
        />
        <FaSearchLocation
          className="iconsearch"
          onClick={() => {
            getData();
            setText("");
          }}
        />
        {/* <button
        onClick={() => {
          getData();
          setText("");
        }}
      >
        Tim kiem
      </button> */}
      </div>

      {error && <h1>{error}</h1>}
      {data && (
        <>
          <h1>{data.name}</h1>
          <div className="info">
            <div className="infoleft">
              <h1>Country {data.sys.country}</h1>
              <h1>Temp {data.main.temp} °C | </h1>
              <h1>Temp {data.weather[0].description}</h1>
            </div>
            <div className="icon">
              <img
                src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
              />
            </div>
          </div>
        </>
      )}
    </div>
    </div>
  );
}
