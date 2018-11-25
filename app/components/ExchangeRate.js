var React = require('react');
var ReactDOM = require('react-dom');
var fx = require("money");

var ExchangeRateContainer = React.createClass({
  render: function () {
    return (
      <div className='col-md-8 col-md-offset-2'>
        <div className='react_item_container'>
          <h4> Currency converter </h4>
          <p>
            App converts your input by the exchange rate of chosen currency.
          </p>
          <ExchangeRateCalculator />
        </div>
      </div>
    );
  }
});

var ExchangeRateCalculator = React.createClass({
  getInitialState: function () {
    return {
      inputNumberLeft: '',
      inputNumberRight: '',
      selectedCurrencyLeft: 'EUR',
      selectedCurrencyRight: 'UAH',
      rates: {},
      currenciesNames: {}
    }
  },

  loadRatesFromServer: function() {
    var ratesLink = 'https://openexchangerates.org/api/latest.json?' +
               'app_id=1697071e3bff42dbac3df8e0fe928658'
    $.getJSON(ratesLink, function (data) {
      fx.rates = data.rates;
      fx.base = data.base;

      this.setState({rates: fx.rates})
    }.bind(this));

    currenciesLink = 'https://openexchangerates.org/api/currencies.json'
    $.getJSON(currenciesLink, function (data) {
      this.setState({currenciesNames: data})
    }.bind(this));
  },

  componentDidMount: function () {
    this.loadRatesFromServer();

    $('.selectCurrency').chosen();
  },

  handleLeftNumberChange: function (e) {
    newNumber = e.target.value === '0' ? '' : e.target.value;

    this.setState({ inputNumberLeft: newNumber });

    this.convertNumberLeft(newNumber);
  },

  handleRightNumberChange: function (e) {
    newNumber = e.target.value === '0' ? '' : e.target.value;

    this.setState({ inputNumberRight: newNumber });

    this.convertNumberRight(newNumber);
  },

  convertNumberLeft: function (numberToConvert, currency, action) {
    if (currency == undefined) {
      currency = this.state.selectedCurrencyLeft;
    };

    if (action == 'currencyChangeRight') {
      currency_to = currency;
      currency_from = this.state.selectedCurrencyLeft;
    } else {
      currency_to = this.state.selectedCurrencyRight;
      currency_from = currency;
    };


    if (numberToConvert != '') {
      convertedNumber = fx.convert(Number(numberToConvert),
                                    { from: currency_from,
                                      to: currency_to}).toFixed(2);
    } else {
      convertedNumber = '';
    };

    this.setState({ inputNumberRight: convertedNumber })
  },

  convertNumberRight: function (numberToConvert, currency) {
    if (currency == undefined) {
      currency = this.state.selectedCurrencyRight;
    };

    if (numberToConvert != '') {
      convertedNumber = fx.convert(Number(numberToConvert),
                                    { from: currency,
                                      to: this.state.selectedCurrencyLeft
                                    }).toFixed(2);
    } else {
      convertedNumber = '';
    };

    this.setState({ inputNumberLeft: convertedNumber })
  },

  handleCurrencyChangeLeft: function (e) {
    currency = e.target.value;
    this.setState({ selectedCurrencyLeft: currency })

    this.convertNumberLeft(this.state.inputNumberLeft, currency)
  },

  handleCurrencyChangeRight: function (e) {
    currency = e.target.value;
    this.setState({ selectedCurrencyRight: currency })

    this.convertNumberLeft(this.state.inputNumberLeft, currency,
                            'currencyChangeRight')
  },

  render: function () {
    var currencies = Object.keys(this.state.rates);
    var currenciesNames = Object.keys(this.state.currenciesNames)
                          .map(function(key) {
                            return this.state.currenciesNames[key];
                          }.bind(this));

    var optionsForSelect = currencies.map(function (currency, i) {
      return (
        <option key={i} value={currency}>
          { currency } { currenciesNames[i] }
        </option>
      );
    });

    return (
      <div>
        <div className='row'>
          <div className='col-md-5 col-sm-5 col-xs-5'>
            <input
              type='number'
              className='form-control input-sm'
              id='exchange_input'
              value={ this.state.inputNumberLeft }
              onChange={ this.handleLeftNumberChange } />
            <select
              className='form-control'
              value={ this.state.selectedCurrencyLeft }
              onChange={ this.handleCurrencyChangeLeft }>
                { optionsForSelect }
            </select>
          </div>
          <div className='col-md-2 col-sm-2 col-xs-2' id='exchange_sign'>
            <i className="fa fa-exchange fa-2x" aria-hidden="true"></i>
          </div>
          <div className='col-md-5 col-sm-5 col-xs-5'>
            <input
              type='number'
              className='form-control input-sm'
              id='exchange_input'
              value={ this.state.inputNumberRight }
              onChange={ this.handleRightNumberChange } />
            <select
              className='form-control'
              value={ this.state.selectedCurrencyRight }
              onChange={ this.handleCurrencyChangeRight }>
                { optionsForSelect }
            </select>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = ExchangeRateContainer;
