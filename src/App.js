//import logo from './logo.svg';
//import './App.css';
import './style.css';
// API LINK :- https://api.openweathermap.org/data/2.5/weather?q=hyderabad&appid=7df26d874cd7726337df35dd889f55bb
import React, { useState, useEffect } from 'react'

const App = () => {
  const [searchValue, setSearchValue] = useState("kanpur");
  const [tempInfo, setTempInfo] = useState({});
  const [weatherState, setWeatherState] = useState();

  const getWeatherInfo = async() =>{
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=7df26d874cd7726337df35dd889f55bb`;
      const res = await fetch(url);
      const data = await res.json();
      //console.log(data);
      const {temp, humidity, pressure, temp_min, temp_max} = data.main;
      const {main:weathermood} = data.weather[0];
      const {name} = data;
      const {speed} = data.wind;
      const {country, sunset, sunrise} = data.sys;
      
      const myWeatherInfo = {
        temp, humidity, pressure,weathermood, name, speed, country, sunset, sunrise, temp_min, temp_max
      };
      
   

     

    



   // console.log(timeStr);
      setTempInfo(myWeatherInfo);
      //console.log(temp);
      //console.log(humidity);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if(tempInfo.weathermood){
      switch (tempInfo.weathermood) {
        case "Clouds": setWeatherState("wi-day-cloudy");break;
        case "Haze": setWeatherState("wi-fog");break;
        case "Clear": setWeatherState("wi-day-sunny");break;
        
          
      
        default:setWeatherState("wi-day-sunny");
          break;
      }
    }
  }, [tempInfo.weathermood]);

  useEffect(() => {getWeatherInfo(); });
  return (
    <>
    <div className="wrap">
      <div className="search">
        <input type = "search" placeholder="search..." autoFocus id = "search" className="searchTerm" value={searchValue} onChange={(e)=>setSearchValue(e.target.value)}></input>
        <button type = "button" className="searchButton" onClick={getWeatherInfo}>Search</button>
      </div>
    </div>
    <article className = "widget">
      <div className="weatherIcon"> 
        <i className={`wi ${weatherState}`}></i>
      </div>
      <div className="weatherInfo">
        <div className="temperature">
          <span>{tempInfo.temp}&deg;</span>
        </div>
        <div className="description">
          <div className="weatherCondition">
          {tempInfo.weathermood}
          </div>
          <div className="place">{tempInfo.name}, {tempInfo.country}</div>
        </div>
      </div>
      <div className="date">
          {new Date().toLocaleString()}
      </div>
      
      <div className="extra-temp">
        <div className="temp-info-minmax">
          <div className="two-sided-section">
            <p><i className={"wi wi-sunset"}></i></p>
            <p className="extra-info-leftside">Max: {tempInfo.temp_min - 4}<br></br>Min: {tempInfo.temp_max + 4}</p>
          </div>
          <div className="two-sided-section">
            <p><i className={"wi wi-humidity"}></i></p>
            <p className="extra-info-leftside">{tempInfo.humidity}<br></br>Humidity</p>
          </div>
        </div>
        <div className="temp-info-minmax">
          <div className="two-sided-section">
            <p><i className={"wi wi-rain"}></i></p>
            <p className="extra-info-leftside">{tempInfo.pressure}<br></br>Pressure</p>
          </div>
          <div className="two-sided-section">
            <p><i className={"wi wi-strong-wind"}></i></p>
            <p className="extra-info-leftside">{tempInfo.speed}<br></br>Speed</p>
          </div>
        </div>
      </div>
    </article>
    </>
  )
}

export default App
