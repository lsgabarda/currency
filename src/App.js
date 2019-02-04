import React, { Component } from 'react';

import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      amount: 0,
      showValue: 0,
      currency_value: 0,
      currencies: []
    }

    this.valueChange = this.valueChange.bind(this);
    this.currencyChange = this.currencyChange.bind(this);
  }

  componentDidMount() {
    fetch('http://data.fixer.io/api/latest?access_key=7eab651ae063a666e85ece879ba3ad31')
      .then(results => results.json())
      .then(data => {

        console.log(data.rates)

        this.setState({ currencies: data.rates })
      })



  }

  valueChange(event) {
    this.setState({ amount: event.target.value })
  }

  currencyChange(event) {

    this.setState({ currency_value: event.target.value });

  }


  buttonSubmit = () => {
    this.setState({ showValue: this.state.amount * this.state.currency_value })
  }


  render() {
    return (
      <div className="App">
        EUR:
        &nbsp;
        <input type="number" name="amount" onChange={this.valueChange} value={this.state.amount} />
        &nbsp;
        &nbsp;
        TO
        &nbsp;
        &nbsp;

        <select onChange={this.currencyChange} value={this.state.currency_value}>
          <option value='0' >Select</option>
          {
            Object.entries(this.state.currencies).map(([objectKey, value]) => {
              return (
                <option key={objectKey} value={value}>{objectKey}</option>
              )

            })
          }
        </select>
        &nbsp;
        &nbsp;

        <input type="button" value="Convert" onClick={this.buttonSubmit} />
        &nbsp;
        &nbsp;
        <input type="text" name="convertedAmount" disabled value={this.state.showValue} />

      </div >
    );
  }
}

export default App;
