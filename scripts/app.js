var CounterDisplay = React.createClass({
  render: function() {
    return (
      <div>
        <div>{this.props.counterProp}</div>
        <br />
        <div className='btn-group'>
          <button className='btn btn-info' onClick={this.props.incrementCounter}>+</button>
          <button className='btn btn-danger' onClick={this.props.decrementCounter}>-</button>
        </div>
      </div>
    );
  }
});

var Counter = React.createClass({
    getInitialState: function() {
    return {
        counter: 0
    };
  },
  handleIncrement(){
    // Update counter state
    this.setState({counter : this.state.counter+1});
  },
  handleDecrement(){
      // Update counter state
    this.setState({counter : this.state.counter-1});
  },
  render: function() {
    // Pass down handlers to CounterDisplay component
    return <div>
            <h2>{this.props.name}</h2>
            <CounterDisplay
            counterProp={this.state.counter}
          incrementCounter={this.handleIncrement}
          decrementCounter={this.handleDecrement}></CounterDisplay>
      </div>;
  }
});

ReactDOM.render(
  <Counter name={'ReactJS counter'} />,
  document.getElementById('container')
);
