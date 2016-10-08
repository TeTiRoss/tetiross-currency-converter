var React = require('react');

var ExchangeRateContainer = React.createClass({
  getInitialState: function () {
    return {
      rates: [],
      activeBoxIndex: 0
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

  changeActiveRateBox: function (index) {
    this.setState({
      activeBoxIndex: index,
    })
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
        rateBoxClass={ i === this.state.activeBoxIndex ? 'rate-box active' : 'rate-box' }
        key={i}
        index={i}
        onRateBoxClick={this.changeActiveRateBox}
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
            exchangeRates={this.state.rates}
            activeBox={this.state.activeBoxIndex} />

        </div>
      </div>
    );
  }
})

var RateBox = React.createClass({

  handleRateBoxClick: function () {
    this.props.onRateBoxClick(this.props.index);
  },

  render: function () {
    return (
      <div className={this.props.rateBoxClass}
           onClick={this.handleRateBoxClick}
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
      inputNumber: '',
      convertedNumber: ''
    }
  },

  handleNumberChange: function (e) {
    newNumber = e.target.value === '0' ? '' : e.target.value;

    this.setState({ inputNumber: newNumber });

    this.convertNumber(newNumber, this.props);
  },

  convertNumber: function (numberToConvert, props) {
    exchangeRate = props.exchangeRates[props.activeBox].buy;

    if (numberToConvert != '') {
      convertedNumber = (parseInt(numberToConvert, 10) * exchangeRate)
                           .toFixed(2);
    } else {
      convertedNumber = '';
    };

    this.setState({ convertedNumber: convertedNumber })
  },

  componentWillReceiveProps: function (nextProps) {
    this.convertNumber(this.state.inputNumber, nextProps)
  },

  render: function () {
    var output = function () {
      converted = this.state.convertedNumber;

      if ( converted != '' && converted != 0 ) {
        return <h5> &#61; { converted } UAH </h5>
      } else {
        return ''
      };
    }.bind(this);

    return (
      <div>
        <div className='row'>
          <div className='col-md-3 col-sm-3 col-xs-5'>
            <input
              type='number'
              min='0'
              max='9999999999'
              className='form-control input-sm'
              id='exchange_input'
              value={ this.state.inputNumber }
              onChange={ this.handleNumberChange } />
          </div>
        </div>
        { output() }
      </div>
    );
  }
});

module.exports = ExchangeRateContainer;
