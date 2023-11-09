import React, { Component } from 'react';
import './App.css';
import Form from './Form';
import Result from './Result';

const APIkey = '0d7f7329e2ba91c249607dd69235f472';

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
    }

    handleChangeValue = e => {
        this.setState({
            value: e.target.value,
        });
    }

    handleSubmit = e => {
        e.preventDefault();
        const API = `https://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&appid=${APIkey}&units=metric`;

        fetch(API)
        .then(response => {
            if(response.ok) {
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
                city: this.state.value,
                sunrise: data.sys.sunrise,
                sunset: data.sys.sunset,
                temp: data.main.temp,
                pressure: data.main.pressure,
                wind: data.wind.speed,
            }))
        })
        .catch(err => {
            this.setState(prevState =>({
                err: true,
                city: this.state.value
            }))
        })
    }

    render(){
        return (
            <div className="App">
                <Form 
                    value={this.state.value} 
                    change={this.handleChangeValue} 
                    submit={this.handleSubmit} 
                />
                <Result weather={this.state}/>
            </div>
        );
    }
}

export default App;
