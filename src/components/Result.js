import React from "react";
import style from './Result.module.scss';

import icons from '../icons';

// const iconsJson = require('../icons.json');
// const icons = JSON.parse(iconsJson);
// console.log(icons[0])

const Result = props => {

    const { date, city, sunrise, sunset, temp, tempFeels, pressure, humidity, wind, clouds, icon, description, err } = props.weather;

    let content = null;

    if (!err && city) {
        const sunriseTime = new Date(sunrise * 1000).toLocaleString();
        const sunsetTime = new Date(sunset * 1000).toLocaleString();
        const roundTemp = Math.round(temp);
        content = (
            <div className={style.resultContainer}>
                <div className={style.resultMainWeather}>
                    <div className={style.resultMainWeatherIcon}>
                        <img src={`http://serwer142787.lh.pl/images/weatherapp/${icon}.png`} alt="icon" />
                    </div>
                    <div className={style.resultMainWeatherInfo}>
                        <h2 className={style.resultCity}>{city}</h2>
                        <p className={style.resultDate}>{date}</p>
                        <div className={style.resultTemp}>
                            <div className={style.resultTempReal}>{roundTemp}<sup>o</sup>C</div>
                            <div className={style.resultTempFeels}> / {Math.round(tempFeels)}<sup>o</sup>C</div>
                        </div>
                    </div>
                </div>
                <div className={style.resultDescription}>{description}</div>
                <div className={style.resultParameters}>
                    <div className={style.resultParametersItem}><span className={style.icon}>{icons.sunrise}</span> <p>{sunriseTime.slice(11, 17)}</p></div>
                    <div className={style.resultParametersItem}><span className={style.icon}>{icons.sunset}</span><p>{String(sunsetTime).slice(11, 17)}</p></div>
                    <div className={style.resultParametersItem}><span className={style.icon}>{icons.pressure}</span><p>{pressure} mPa</p></div>
                    <div className={style.resultParametersItem}><span className={style.icon}>{icons.wind}</span><p>{wind.toFixed(1)} m/s</p></div>
                    <div className={style.resultParametersItem}><span className={style.icon}>{icons.clouds}</span><p>{clouds}%</p></div>
                    <div className={style.resultParametersItem}><span className={style.icon} alt="wilgotność">{icons.humidity}</span><p>{humidity} %</p></div>
                </div>
                {/* <p>Opady deszczu: {rain}mm</p>
                <p>Opady śniegu: {snow}mm</p> */}
            </div>
        );
    }

    return (
        <div className={style.result}>
            {err ? `Nie ma w bazie ${city}` : content}
        </div>
    );
}

export default Result;