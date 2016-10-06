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
        key={i}
      />
    });

    return (
      <div className='col-md-8 col-md-offset-2'>
        <div className='react_item_container'>
          <h4> Exchange rate app </h4>
          <hr />
          {rate_boxes}
        </div>
      </div>
    );
  }
})

function RateBox (props) {
  return (
    <div className='rate-box'
         style={props.currencyFrom === 'RUR' ? {display: 'none'} : {}} >

      <h4> {props.currencyFrom} &#45; {props.currencyTo} </h4>
      <p> Buy: {props.buy} </p>
      <p> Sell: {props.sale} </p>
    </div>
  );
};

module.exports = ExchangeRateContainer;
