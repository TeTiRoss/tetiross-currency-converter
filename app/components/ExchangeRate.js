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
    setInterval(this.loadRatesFromServer, 5000)
  },

  render: function () {
    var rate_boxes = this.state.rates.map(function (rate, i) {
      return <RateBox
        currencyFrom={rate.ccy}
        currencyTo={rate.base_ccy}
        buy={rate.buy}
        sale={rate.sale}
        rateBoxClass={ i === 0 ? 'rate-box active' : 'rate-box' }
        key={i}
      />
    });

    return (
      <div className='col-md-8 col-md-offset-2'>
        <div className='react_item_container'>
          <h4> Exchange rate app </h4>
          <p>
            App converts your input by the exchange rate of chosen currency.
            When converting it is using <b> Buy </b> rate.
          </p>
          {rate_boxes}
          <ExchangeRateCalculator rates={this.state.rates} />
        </div>
      </div>
    );
  }
})

function RateBox (props) {
  return (
    <div className={props.rateBoxClass}
         style={props.currencyFrom === 'RUR' ? {display: 'none'} : {}} >

      <h4> {props.currencyFrom} &#45; {props.currencyTo} </h4>
      <p> Buy: {props.buy} </p>
      <p> Sale: {props.sale} </p>
    </div>
  );
};

var ExchangeRateCalculator = React.createClass({
  getInitialState: function () {
    return {
      number: null,
      exchanged_number: ''
    }
  },

  handleNumberChange: function (e) {
    newNumber = e.target.value;

    if (newNumber != '') {
      exchanged_number = (parseInt(newNumber, 10) * this.props.rates[0].buy)
                           .toFixed(2)
    } else {
      exchanged_number = ''
    };

    this.setState({
      number: newNumber,
      exchanged_number: exchanged_number
    });
  },

  render: function () {
    var output = (
      <h5> &#61; {this.state.exchanged_number} </h5>
    );

    return (
      <div>
        <div className='row'>
          <div className='col-xs-3'>
            <input
              type='number'
              min='1'
              max='9999999999'
              className='form-control input-sm'
              id='exchange_input'
              value={this.state.inputNumber}
              onChange={this.handleNumberChange} />
          </div>
        </div>
        {this.state.exchanged_number != '' ? output : ''}
      </div>
    );
  }
});

module.exports = ExchangeRateContainer;
