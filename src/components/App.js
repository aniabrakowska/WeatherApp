import React, { Component } from 'react';
import style from './App.module.scss';
import Form from './Form';
import Result from './Result';
import Hints from './Hints';

const APIkey = '0d7f7329e2ba91c249607dd69235f472';
const citiesList = require('../city.list.json');
const citiesListPL = citiesList.filter(city => city.country === "PL");

let lat = 52.2298;
let lon = 21.0118;

class App extends Component {


    state = {
        value: '',
        data: '',
        city: '',
        icon: '',
        description: '',
        sunrise: '',
        sunset: '',
        temp: '',
        tempFeels: '',
        pressure: '',
        humidity: '',
        wind: '',
        clouds: '',
        err: false,
        cities: [],
        lat: '',
        lon: '',
        reset: true,
    };

    handleSubmit = e => {
        e.preventDefault()
    }

    handleChangeValue = e => {
        e.preventDefault()
        this.setState({
            value: e.target.value,
            reset: true,
        });
    }

    getCurrentPosition = () => {
        if (navigator.geolocation) {
            return new Promise(
                (resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject)
            )
        }
    }

    componentDidMount = () => {

        this.getCurrentPosition()
            .then((position) => {

                const API = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&lang=pl&appid=${APIkey}&units=metric`;

                fetch(API)
                    .then(response => {
                        if (response.ok) {
                            return response;
                        }
                        throw Error('nie udało się')
                    })
                    .then(response => response.json())
                    .then(data => {
                        const time = new Date();
                        const formatTime = `${time.getDate()}.${time.getMonth()}.${time.getFullYear()}`;
                        this.setState(prevState => ({
                            err: false,
                            date: formatTime,
                            city: data.name,
                            sunrise: data.sys.sunrise,
                            sunset: data.sys.sunset,
                            temp: data.main.temp,
                            tempFeels: data.main.feels_like,
                            pressure: data.main.pressure,
                            humidity: data.main.humidity,
                            wind: data.wind.speed,
                            clouds: data.clouds.all,
                            icon: data.weather[0].icon,
                            description: data.weather[0].description,
                            lat: data.coord.lat,
                            lon: data.coord.lon,
                        }))
                    })
                    .catch(err => {
                        this.setState(prevState => ({
                            err: true,
                            city: this.state.value
                        }))
                    })
            })
            .catch(err => {

                const API = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=pl&appid=${APIkey}&units=metric`;

                fetch(API)
                    .then(response => {
                        if (response.ok) {
                            return response;
                        }
                        throw Error('nie udało się')
                    })
                    .then(response => response.json())
                    .then(data => {
                        const time = new Date();
                        const formatTime = `${time.getDate()}.${time.getMonth()}.${time.getFullYear()}`;
                        this.setState(prevState => ({
                            err: false,
                            date: formatTime,
                            city: data.name,
                            sunrise: data.sys.sunrise,
                            sunset: data.sys.sunset,
                            temp: data.main.temp,
                            tempFeels: data.main.feels_like,
                            pressure: data.main.pressure,
                            humidity: data.main.humidity,
                            wind: data.wind.speed,
                            clouds: data.clouds.all,
                            icon: data.weather[0].icon,
                            description: data.weather[0].description,
                            lat: data.coord.lat,
                            lon: data.coord.lon,
                        }))
                    })
                    .catch(err => {
                        this.setState(prevState => ({
                            err: true,
                            city: this.state.value
                        }))
                    })
            })

    }

    componentDidUpdate(prevProps, prevState) {

        if (prevState.value !== this.state.value) {

            if (this.state.value !== '') {
                this.setState(prevState => ({
                    cities: citiesListPL.filter(city => (city.name.toLowerCase()).indexOf(this.state.value.toLowerCase()) !== -1),
                }))
            } else {
                this.setState(prevState => ({
                    cities: [],
                }))
            }
        }
    }

    handleClickHint = city => {

        this.setState(prevState => ({
            reset: false,
            value: ''
        }))

        const API = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=pl&appid=${APIkey}&units=metric`;

        fetch(API)
            .then(response => {
                if (response.ok) {
                    return response;
                }
                throw Error('nie udało się')
            })
            .then(response => response.json())
            .then(data => {
                const time = new Date();
                const formatTime = `${time.getDate()}.${time.getMonth()}.${time.getFullYear()}`;
                this.setState(() => ({
                    err: false,
                    date: formatTime,
                    city: city,
                    sunrise: data.sys.sunrise,
                    sunset: data.sys.sunset,
                    temp: data.main.temp,
                    tempFeels: data.main.feels_like,
                    pressure: data.main.pressure,
                    humidity: data.main.humidity,
                    wind: data.wind.speed,
                    clouds: data.clouds.all,
                    icon: data.weather[0].icon,
                    description: data.weather[0].description,
                    lat: data.coord.lat,
                    lon: data.coord.lon,
                }))
            })
            .catch(err => {
                this.setState(prevState => ({
                    err: true,
                    city: this.state.value
                }))
            })
    }

    render() {
        return (
            <div className={style.container}>
                <Form
                    value={this.state.value}
                    change={this.handleChangeValue}
                    submit={this.handleSubmit}
                />
                {this.state.reset ?
                    <div className={style.hints}>
                        {this.state.cities.map(city =>
                            <Hints key={city.id} name={city.name} click={this.handleClickHint} />
                        )}
                    </div>
                    : null}
                <Result weather={this.state} />
            </div>
        );
    }
}

export default App;
