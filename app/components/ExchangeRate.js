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
      inputNumberRight: ''
    }
  },

  handleLeftNumberChange: function (e) {
    newNumber = e.target.value === '0' ? '' : e.target.value;

    this.setState({ inputNumberLeft: newNumber });

    this.convertNumberLeft(newNumber, this.props);
  },

  handleRightNumberChange: function (e) {
    newNumber = e.target.value === '0' ? '' : e.target.value;

    this.setState({ inputNumberRight: newNumber });

    this.convertNumberRight(newNumber, this.props);
  },

  convertNumberLeft: function (numberToConvert, props) {
    exchangeRate = props.exchangeRates[0].buy;

    if (numberToConvert != '') {
      convertedNumber = (Number(numberToConvert) * exchangeRate).toFixed(2);
    } else {
      convertedNumber = '';
    };

    this.setState({ inputNumberRight: convertedNumber })
  },

  convertNumberRight: function (numberToConvert, props) {
    exchangeRate = props.exchangeRates[0].buy;

    if (numberToConvert != '') {
      convertedNumber = (Number(numberToConvert) / exchangeRate).toFixed(2);
    } else {
      convertedNumber = '';
    };

    this.setState({ inputNumberLeft: convertedNumber })
  },

  render: function () {
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
            <select className='form-control'>
              <option>USD</option>
              <option>EUR</option>
              <option>RUR</option>
              <option>UAH</option>
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
            <select className='form-control'>
              <option>USD</option>
              <option>EUR</option>
              <option>RUR</option>
              <option>UAH</option>
            </select>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = ExchangeRateContainer;
