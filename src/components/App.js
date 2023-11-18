import React, { Component } from 'react';
import './App.css';
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
        sunrise: '',
        sunset: '',
        temp: '',
        pressure: '',
        wind: '',
        err: false,
        cities: [],
        lat: '',
        lon: '',
        reset: true,
    };

    handleChangeValue = e => {
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
                        const time = new Date().toLocaleString();
                        this.setState(prevState => ({
                            err: false,
                            date: time,
                            city: data.name,
                            sunrise: data.sys.sunrise,
                            sunset: data.sys.sunset,
                            temp: data.main.temp,
                            pressure: data.main.pressure,
                            wind: data.wind.speed,
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
                        const time = new Date().toLocaleString();
                        this.setState(prevState => ({
                            err: false,
                            date: time,
                            city: data.name,
                            sunrise: data.sys.sunrise,
                            sunset: data.sys.sunset,
                            temp: data.main.temp,
                            pressure: data.main.pressure,
                            wind: data.wind.speed,
                        }))
                    })
                    .catch(err => {
                        this.setState(prevState => ({
                            err: true,
                            city: this.state.value
                        }))
                    })
            }
            )

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
                const time = new Date().toLocaleString();
                this.setState(prevState => ({
                    err: false,
                    date: time,
                    city: city,
                    sunrise: data.sys.sunrise,
                    sunset: data.sys.sunset,
                    temp: data.main.temp,
                    pressure: data.main.pressure,
                    wind: data.wind.speed,
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
            <div className="App">
                <Form
                    value={this.state.value}
                    change={this.handleChangeValue}
                />
                {this.state.reset ?
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
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
