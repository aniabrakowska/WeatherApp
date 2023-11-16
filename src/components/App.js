import React, { Component } from 'react';
import './App.css';
import Form from './Form';
import Result from './Result';
import Hints from './Hints';

const APIkey = '0d7f7329e2ba91c249607dd69235f472';
const citiesList = require('../city.list.json');
const citiesListPL = citiesList.filter(city => city.country === "PL");

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
    };

    handleChangeValue = e => {
        this.setState({
            value: e.target.value,
        });
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


            const API = `https://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&appid=${APIkey}&units=metric`;

            fetch(API)
                .then(response => {
                    if (response.ok) {
                        return response;
                    }
                    throw Error('nie udało się')
                })
                .then(response => response.json())
                .then(data => {
                    // console.log(data);
                    const time = new Date().toLocaleString();
                    this.setState(prevState => ({
                        err: false,
                        date: time,
                        city: this.state.value,
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
    }

    handleClickHints = (value) => {
        this.setState(prevState => ({
            value: value,
        }))
    }

    render() {
        return (
            <div className="App">
                <Form
                    value={this.state.value}
                    change={this.handleChangeValue}
                />
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {this.state.cities.map(city =>
                        <Hints key={city.id} name={city.name} click={this.handleClickHints} />
                    )}
                </div>
                {<Result weather={this.state} />}
            </div>
        );
    }
}

export default App;
