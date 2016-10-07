var React = require('react');

var ExchangeRateContainer = React.createClass({
  getInitialState: function () {
    return {
      rates: [],
      activeBoxIndex: 0,
      resetInput: false
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
    this.handleInputField('reset');
  },

  handleInputField: function (action) {
    if (action === 'reset') {
      this.setState({ resetInput: true })
    } else {
      this.setState({ resetInput: false })
    };
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
            activeBox={this.state.activeBoxIndex}
            resetInput={this.state.resetInput}
            handleInputField={this.handleInputField} />

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
      exchanged_number: ''
    }
  },

  handleNumberChange: function (e) {
    newNumber = e.target.value;
    exchangeRate = this.props.exchangeRates[this.props.activeBox].buy

    if (newNumber != '') {
      exchanged_number = (parseInt(newNumber, 10) * exchangeRate)
                           .toFixed(2)
    } else {
      exchanged_number = ''
    };

    this.setState({
      inputNumber: newNumber,
      exchanged_number: exchanged_number
    });

    this.props.handleInputField('unreset');
  },

  render: function () {
    var output = (
      <h5> &#61; {this.state.exchanged_number} UAH </h5>
    );

    return (
      <div>
        <div className='row'>
          <div className='col-md-3 col-sm-3 col-xs-5'>
            <input
              type='number'
              min='1'
              max='9999999999'
              className='form-control input-sm'
              id='exchange_input'
              value={ this.props.resetInput ? '' : this.state.inputNumber }
              onChange={this.handleNumberChange} />
          </div>
        </div>
        {this.state.exchanged_number != '' && !this.props.resetInput ? output : ''}
      </div>
    );
  }
});

module.exports = ExchangeRateContainer;
