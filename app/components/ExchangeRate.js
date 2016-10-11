var React = require('react');

var ExchangeRateContainer = React.createClass({
  getInitialState: function () {
    return {
      rates: []
    }
  },

  loadRatesFromServer: function() {
    $.ajax({
      url: 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5',
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({rates: data});
      }.bind(this)
    });
  },

  componentDidMount: function () {
    this.loadRatesFromServer();
    setInterval(this.loadRatesFromServer, 10000)
  },

  render: function () {
    var rate_boxes = this.state.rates.map(function (rate, i) {
      return <RateBox
        currencyFrom={rate.ccy}
        currencyTo={rate.base_ccy}
        buy={rate.buy}
        sale={rate.sale}
        key={i}
      />
    }.bind(this))

    return (
      <div className='col-md-8 col-md-offset-2'>
        <div className='react_item_container'>
          <h4> Exchange rate app </h4>
          <p>
            App converts your input by the exchange rate of chosen currency.
            When converting it is using <b> Buy </b> rate.
          </p>
          {rate_boxes}
          <ExchangeRateCalculator
            exchangeRates={this.state.rates} />

        </div>
      </div>
    );
  }
})

var RateBox = React.createClass({
  render: function () {
    return (
      <div className='rate-box'
           style={this.props.currencyFrom === 'BTC' ? {display: 'none'} : {}} >

        <h4> {this.props.currencyFrom} &#45; {this.props.currencyTo} </h4>
        <p> Buy: {this.props.buy} </p>
        <p> Sale: {this.props.sale} </p>
      </div>
    );
  }
})


var ExchangeRateCalculator = React.createClass({
  getInitialState: function () {
    return {
      inputNumberLeft: '',
      inputNumberRight: '',
      selectedCurrencyLeft: 'EUR',
      selectedCurrencyRight: 'UAH'
    }
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

  convertNumberLeft: function (numberToConvert, currency) {
    if (currency == undefined) {
      currency = this.state.selectedCurrencyLeft;
    };

    var exchangeRate = 1;
    var rates = this.props.exchangeRates;

    for (var i = 0; i < rates.length; i++) {
      if (rates[i].ccy === currency) {
        exchangeRate = rates[i].buy;
        break;
      };
    };

    if (numberToConvert != '') {
      convertedNumber = (Number(numberToConvert) * exchangeRate).toFixed(2);
    } else {
      convertedNumber = '';
    };

    this.setState({ inputNumberRight: convertedNumber })
  },

  convertNumberRight: function (numberToConvert) {
    exchangeRate = this.props.exchangeRates[0].buy;

    if (numberToConvert != '') {
      convertedNumber = (Number(numberToConvert) / exchangeRate).toFixed(2);
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
  },

  render: function () {
    var currencies = this.props.exchangeRates.map(function (rate, i) {
      if (rate.ccy == 'BTC') {
        return <option key={i}> UAH </option>
      };
      return <option key={i}> { rate.ccy } </option>
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
              { currencies }
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
                { currencies }
            </select>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = ExchangeRateContainer;
