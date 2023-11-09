import React from "react";

const Result = props => {

    const {date, city, sunrise, sunset, temp, pressure, wind, err} = props.weather;

    let content = null;

    if(!err && city) {
        const sunriseTime = new Date(sunrise * 1000).toLocaleString();
        const sunsetTime = new Date(sunset * 1000).toLocaleString();
        content = (
            <div>
                <h2>{`Wyszukiwanie dla miasta: ${city}`}</h2>
                <p>Data wyszukiwania: {date}</p>
                <p>Temperatura: {temp}</p>
                <p>Wschód słońca: {sunriseTime}</p>
                <p>Zachód słońca: {sunsetTime}</p>
                <p>Ciśnienie: {pressure} mPa</p>
                <p>Wiatr: {wind} m/s</p>
            </div>
        );
    }

    return(
        <div className="result">
            {err ? `Nie ma w bazie ${city}` : content }
        </div>
    );
}

export default Result;